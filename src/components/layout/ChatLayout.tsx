import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ChatSidebar from '../chat/ChatSidebar'
import ChatHeader from '../chat/ChatHeader'
import ChatArea from '../chat/ChatArea'
import NotificationPanel from '../notifications/NotificationPanel'
import { RootState } from '../../store'
import { useAuth } from '../../hooks/useAuth'

export default function ChatLayout() {
  const { user } = useSelector((state: RootState) => state.auth)
  useAuth() // Initialize auth listener

  console.log('ChatLayout - user state:', user)

  // Redirect to sign in if not authenticated
  if (!user) {
    console.log('No user found, redirecting to signin')
    return <Navigate to="/signin" replace />
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar />
        <ChatArea />
      </div>
      <NotificationPanel />
    </div>
  )
}