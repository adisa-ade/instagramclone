import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sbkvvjrkfojvcshpmugo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNia3Z2anJrZm9qdmNzaHBtdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNjM3NDUsImV4cCI6MjAyMTkzOTc0NX0.ofnKhzu-pZfZEGeisBcmIto6ZHnLuLiQ8P7wb7pI0m8"
export const supabase = createClient(supabaseUrl, supabaseKey)
