create table if not exists public.experience_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_count integer not null check (guest_count between 1 and 6),
  duration_days integer not null check (duration_days between 1 and 6),
  check_in date not null,
  check_out date not null,
  selected_activities jsonb not null default '[]'::jsonb,
  origin_location text not null check (char_length(trim(origin_location)) between 2 and 120),
  transport_method text not null check (transport_method in ('air', 'train', 'car', 'bus')),
  selected_travel_option jsonb,
  contact_name text not null check (char_length(trim(contact_name)) between 2 and 120),
  contact_email text not null check (char_length(trim(contact_email)) between 3 and 254),
  contact_phone text,
  internal_notes text not null default '',
  updated_at timestamptz not null default now(),
  enquiry_status text not null default 'pending' check (enquiry_status in ('pending', 'contacted', 'confirmed', 'closed')),
  constraint experience_enquiries_dates_valid check (check_out > check_in)
);

alter table public.experience_enquiries add column if not exists contact_name text;
alter table public.experience_enquiries add column if not exists contact_email text;
alter table public.experience_enquiries add column if not exists contact_phone text;
alter table public.experience_enquiries add column if not exists internal_notes text not null default '';
alter table public.experience_enquiries add column if not exists updated_at timestamptz not null default now();

alter table public.experience_enquiries drop constraint if exists experience_enquiries_enquiry_status_check;
alter table public.experience_enquiries drop constraint if exists experience_enquiries_status_valid;
alter table public.experience_enquiries add constraint experience_enquiries_status_valid check (enquiry_status in ('pending', 'contacted', 'confirmed', 'closed'));

alter table public.experience_enquiries enable row level security;

revoke all on table public.experience_enquiries from anon, authenticated;
grant insert on table public.experience_enquiries to anon;

drop policy if exists "Allow public enquiry submissions" on public.experience_enquiries;
create policy "Allow public enquiry submissions"
  on public.experience_enquiries
  for insert
  to anon
  with check (
    guest_count between 1 and 6
    and duration_days between 1 and 6
    and check_out > check_in
    and jsonb_typeof(selected_activities) = 'array'r
    and char_length(trim(origin_location)) between 2 and 120
    and transport_method in ('air', 'train', 'car', 'bus')
    and char_length(trim(contact_name)) between 2 and 120
    and char_length(trim(contact_email)) between 3 and 254
    and enquiry_status = 'pending'
  );

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Allow admins to view enquiries" on public.experience_enquiries;
create policy "Allow admins to view enquiries"
  on public.experience_enquiries
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Allow admins to update enquiries" on public.experience_enquiries;
create policy "Allow admins to update enquiries"
  on public.experience_enquiries
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Allow admins to delete enquiries" on public.experience_enquiries;
create policy "Allow admins to delete enquiries"
  on public.experience_enquiries
  for delete
  to authenticated
  using (public.is_admin());

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'experience_enquiries'
  ) then
    alter publication supabase_realtime add table public.experience_enquiries;
  end if;
end
$$;

-- Create an Auth user in Supabase Authentication, then assign app_metadata.role = 'admin'
-- using a trusted server-side workflow. Never put a service-role key in this frontend.
