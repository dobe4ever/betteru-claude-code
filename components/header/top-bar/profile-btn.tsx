// components/header/top-bar/profile-btn.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LogOut, Edit, Crown } from "lucide-react"
import { BigAvatar } from "../user-card/BigAvatar"
import { useAuth } from "@/components/auth/AuthProvider"

export function ProfileBtn() {
  const { user, signOut } = useAuth()
  const username = user?.user_metadata?.username || "User"
  const email = user?.email || "email@example.com"
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full size-8 text-white pr-">
          <BigAvatar classnames="size-8 border rounded-full border-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-3">
        <DropdownMenuItem className="text-md text-gray-500 p-2">{email}</DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row py-2">
          <div className="flex items-center">
            <BigAvatar classnames="size-10 border-2 rounded-full border-white mr-3 flex-shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-md font-medium truncate whitespace-nowrap">{username}</p>
              <p className="text-gray-500 text-sm whitespace-nowrap">Free plan</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-orange-50 border border-orange-main/20 rounded-md my-1 hover:bg-orange-100 transition-colors">
          <Crown className="mr-2 h-4 w-4 text-orange-main" /> <span className="text-gray-700 font-medium">Upgrade to Premium</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent('open-edit-profile'))}>
          <Edit className="mr-2 h-4 w-4 text-orange-main" /> <span className="text-gray-700">Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4 text-orange-main" /> <span className="text-gray-700">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
