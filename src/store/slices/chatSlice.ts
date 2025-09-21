import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  loading: false,
  error: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createConversation: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const newConversation: Conversation = {
        id: action.payload.id,
        title: action.payload.title,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      state.conversations.unshift(newConversation)
      state.activeConversationId = action.payload.id
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload
    },
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Omit<Message, 'id'> }>) => {
      const conversation = state.conversations.find(c => c.id === action.payload.conversationId)
      if (conversation) {
        const message: Message = {
          ...action.payload.message,
          id: Date.now().toString(),
        }
        conversation.messages.push(message)
        conversation.updatedAt = new Date()
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { createConversation, setActiveConversation, addMessage, clearError } = chatSlice.actions
export default chatSlice.reducer