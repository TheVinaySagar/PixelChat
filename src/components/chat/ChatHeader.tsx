import { useDispatch, useSelector } from 'react-redux'
import { Bell, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* User info can be added here if needed */}
      </div>

      <div className="flex items-center gap-4">
        {/* Credits Counter */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Credits:</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {credits}
          </Badge>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationClick}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">
              {user?.email?.split('@')[0] || 'User'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}