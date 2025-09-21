import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Send, Paperclip, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addMessage } from '../../store/slices/chatSlice'
import { consumeCredit } from '../../store/slices/authSlice'
import { RootState, AppDispatch } from '../../store'

export default function ChatInput() {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { activeConversationId } = useSelector((state: RootState) => state.chat)
  const { credits } = useSelector((state: RootState) => state.auth)

  const handleSend = async () => {
    if (!message.trim() || !activeConversationId) return

    // Check if user has credits
    if (credits <= 0) {
      // Could show a toast or modal about insufficient credits
      console.log('Insufficient credits')
      return
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: message.trim(),
      role: 'user' as const,
      timestamp: new Date()
    }

    dispatch(addMessage({ conversationId: activeConversationId, message: userMessage }))

    // Clear the input
    setMessage('')

    // Consume credit
    try {
      await dispatch(consumeCredit()).unwrap()
    } catch (error) {
      console.error('Failed to consume credit:', error)
      return
    }

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: "That's an interesting point. Here's what I think... This is a mock response to demonstrate the chat functionality. In a real application, this would be connected to an actual AI service.",
        role: 'assistant' as const,
        timestamp: new Date()
      }
      dispatch(addMessage({ conversationId: activeConversationId, message: aiMessage }))
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileAttach = () => {
    // Handle file attachment
    console.log('File attach clicked')
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Handle voice recording
    console.log('Recording toggled:', !isRecording)
  }

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[200px] pr-24 resize-none border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-white shadow-sm"
            disabled={!activeConversationId}
          />
          
          {/* Action buttons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={handleFileAttach}
              className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
              disabled={!activeConversationId}
            >
              <Paperclip className="h-4 w-4 text-gray-500" />
            </Button> */}
            
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleRecording}
              className={`h-8 w-8 p-0 rounded-lg ${
                isRecording 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'hover:bg-gray-100'
              }`}
              disabled={!activeConversationId}
            >
              <Mic className="h-4 w-4" />
            </Button> */}
            
            <Button
              onClick={handleSend}
              disabled={!message.trim() || !activeConversationId || credits <= 0}
              className="h-8 w-8 p-0 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Character count or status */}
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>
            {!activeConversationId 
              ? "Select a conversation to start chatting"
              : credits <= 0 
                ? "No credits remaining" 
                : `${credits} credits remaining`
            }
          </span>
          <span>{message.length}/2000</span>
        </div>
      </div>
    </div>
  )
}
