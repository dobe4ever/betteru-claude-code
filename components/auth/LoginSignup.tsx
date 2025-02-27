"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogoOrange } from "@/components/header/top-bar/logo"
import { supabase } from "@/utils/supabase"

interface LoginSignupProps {
  onAuthenticated: (email: string, username: string) => void
}

export function LoginSignup({ onAuthenticated }: LoginSignupProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        onAuthenticated(data.user.email || "", data.user.user_metadata.username || "")
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        onAuthenticated(data.user.email || "", username)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-orange flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <LogoOrange />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {!isLogin && (
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-orange-500 hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}

