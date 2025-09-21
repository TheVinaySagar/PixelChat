import { useDispatch, useSelector } from 'react-redux'
import { Bell, ChevronDown, User, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { togglePanel } from '../../store/slices/notificationSlice'
import { signOut } from '../../store/slices/authSlice'
import { RootState, AppDispatch } from '../../store'

export default function ChatHeader() {
  const dispatch = useDispatch<AppDispatch>()
  const { credits, user } = useSelector((state: RootState) => state.auth)
  const { unreadCount } = useSelector((state: RootState) => state.notification)

  const handleNotificationClick = () => {
    dispatch(togglePanel())
  }

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return (
    <header className="h-16 border-b border-border bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 shadow-sm">
      {/* Left side - App title */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground">AI Chat</h1>
      </div>

      {/* Right side - Credits, Notifications, User menu */}
      <div className="flex items-center gap-4">
        {/* Credits Counter with coins icon */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-sm">
          <Coins className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            {credits.toLocaleString()}
          </span>
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotificationClick}
          className="relative rounded-xl h-8 px-4"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-blue-500 hover:bg-blue-500 border-transparent"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* User Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 rounded-xl h-10 px-6 py-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm">
                {user?.email?.split('@')[0] || 'User'}
              </span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 text-red-600"
              onClick={handleSignOut}
            >
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}