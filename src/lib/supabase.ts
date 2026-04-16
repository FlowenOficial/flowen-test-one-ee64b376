import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://worthlessdonkey-supabase.cloudfy.live',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzczOTU1NTYxLCJleHAiOjE4MDU0OTE1NjF9.LnkiAOhVU_J0m3OBDcTrsjCKdOoaj13ic-w8SjcbtG0'
);
