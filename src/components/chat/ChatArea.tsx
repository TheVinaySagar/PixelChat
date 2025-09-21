import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Send, MessageSquare, Brain, Code, Heart, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { addMessage, createConversation } from '../../store/slices/chatSlice'
import { updateCredits } from '../../store/slices/authSlice'
import { RootState, AppDispatch } from '../../store'

const suggestions = [
  {
    icon: Brain,
    text: "Explain quantum computing in simple terms"
  },
  {
    icon: Code,
    text: "Write a Python function to sort a list"
  },
  {
    icon: Heart,
    text: "What are the benefits of meditation?"
  },
  {
    icon: Plane,
    text: "Help me plan a weekend trip to Paris"
  }
]

export default function ChatArea() {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { conversations, activeConversationId } = useSelector((state: RootState) => state.chat)
  const { credits } = useSelector((state: RootState) => state.auth)

  const activeConversation = conversations.find(c => c.id === activeConversationId)
  const hasMessages = activeConversation?.messages.length > 0

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || credits <= 0) return

    let conversationId = activeConversationId

    // Create new conversation if none exists
    if (!conversationId) {
      conversationId = Date.now().toString()
      dispatch(createConversation({
        id: conversationId,
        title: text.slice(0, 50) + (text.length > 50 ? '...' : '')
      }))
    }

    // Add user message
    dispatch(addMessage({
      conversationId,
      message: {
        content: text,
        role: 'user',
        timestamp: new Date()
      }
    }))

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      dispatch(addMessage({
        conversationId: conversationId!,
        message: {
          content: `I understand you're asking about "${text}". This is a simulated response. In a real implementation, this would connect to an AI service to provide helpful answers.`,
          role: 'assistant',
          timestamp: new Date()
        }
      }))
    }, 1000)

    // Deduct credits
    dispatch(updateCredits(Math.max(0, credits - 1)))
    setMessage('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(message)
  }

  const handleSuggestionClick = (suggestionText: string) => {
    handleSendMessage(suggestionText)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(message)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Messages or Welcome Screen */}
      <div className="flex-1 overflow-y-auto p-6">
        {!hasMessages ? (
          /* Welcome Screen */
          <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              {/* AI Star Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-3xl font-semibold text-foreground mb-3">
                Welcome to AI Chat
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Start a conversation with our AI assistant. Ask questions, get help with tasks, or explore ideas together.
              </p>
            </div>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:bg-chat-suggestion transition-colors border border-border"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <div className="flex items-center gap-3">
                    <suggestion.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      {suggestion.text}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="max-w-3xl mx-auto space-y-6">
            {activeConversation?.messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-12'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-secondary-foreground">U</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="resize-none pr-12 min-h-[52px] rounded-2xl border-2 focus:border-primary"
              rows={1}
              disabled={credits <= 0}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 rounded-full"
              disabled={!message.trim() || credits <= 0}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{message.length}/2000</span>
          </div>
          
          {credits <= 0 && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                You've run out of credits. Please contact support to add more.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}