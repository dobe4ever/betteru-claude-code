// components/header/top-bar/profile-btn.tsx
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

interface ProfileBtnProps {
  username: string
  avatarUrl: string
}

export function ProfileBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full size-8 text-white pr-">
          <BigAvatar classnames="size-8 border rounded-full border-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-62 p-3">
        <DropdownMenuItem className="text-md text-gray-500 p-2">email@gmail.com</DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row">
          <div className="flex justify-between items-center">
            <BigAvatar classnames="size-10 border-2 rounded-full border-white mr-2" />
            <span className="flex flex-col gap-0 ml-">
              <p className="text-md">username</p>
              <p className="text-gray-500">Free plan</p>
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Crown className="mr-2 h-4 w-4" /> Upgrade to Premium
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

