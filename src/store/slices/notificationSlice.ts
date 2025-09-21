import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isOpen: boolean
}

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      title: 'Welcome to AI Chat',
      message: 'You have 100 credits to start chatting with our AI assistant.',
      type: 'info',
      timestamp: new Date(),
      read: false,
    },
  ],
  unreadCount: 1,
  isOpen: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      }
      state.notifications.unshift(notification)
      state.unreadCount += 1
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification && !notification.read) {
        notification.read = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true)
      state.unreadCount = 0
    },
    togglePanel: (state) => {
      state.isOpen = !state.isOpen
    },
    closePanel: (state) => {
      state.isOpen = false
    },
  },
})

export const { addNotification, markAsRead, markAllAsRead, togglePanel, closePanel } = notificationSlice.actions
export default notificationSlice.reducer