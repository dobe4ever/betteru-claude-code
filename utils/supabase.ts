import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

class SupabaseClientSingleton {
  private static instance: ReturnType<typeof createClient> | null = null

  public static getInstance(): ReturnType<typeof createClient> {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = createClient(supabaseUrl, supabaseAnonKey)
    }
    return SupabaseClientSingleton.instance
  }
}

export const supabase = SupabaseClientSingleton.getInstance()

