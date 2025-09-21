import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User, Bot, Copy, ThumbsUp, ThumbsDown, MoreHorizontal, Sparkles, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RootState, AppDispatch } from '../../store'
import { createConversation, setActiveConversation, addMessage } from '../../store/slices/chatSlice'

const suggestions = [
  "Explain quantum computing in simple terms",
  "Write a Python function to sort a list", 
  "What are the benefits of meditation?",
  "Help me plan a weekend trip to Paris"
]

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatArea() {
  const { conversations, activeConversationId } = useSelector((state: RootState) => state.chat)
  const activeConversation = conversations.find(conv => conv.id === activeConversationId)

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleThumbsUp = (messageId: string) => {
    // Handle thumbs up
    console.log('Thumbs up:', messageId)
  }

  const handleThumbsDown = (messageId: string) => {
    // Handle thumbs down
    console.log('Thumbs down:', messageId)
  }

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">Start a conversation</h3>
          <p className="text-sm text-muted-foreground">Select a conversation or create a new one to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto">
          {activeConversation.messages.map((message: Message) => (
            <div
              key={message.id}
              className={`group flex gap-4 py-6 px-6 transition-colors ${
                message.role === 'assistant' 
                  ? 'bg-gradient-to-r from-blue-50/30 to-indigo-50/30' 
                  : 'bg-transparent'
              }`}
            >
              {/* Avatar */}
              <Avatar className="h-8 w-8 shadow-sm">
                <AvatarFallback 
                  className={
                    message.role === 'user'
                      ? "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600"
                      : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                  }
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                {/* Header with name and timestamp */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium text-sm text-foreground">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                {/* Message bubble */}
                <div 
                  className={`prose prose-sm max-w-none p-4 rounded-2xl bg-white shadow-sm ${
                    message.role === 'user' 
                      ? 'border border-gray-100 ml-0' 
                      : 'border border-blue-100 mr-8'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words m-0 text-foreground">
                    {message.content}
                  </p>
                </div>

                {/* Action buttons for AI messages */}
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(message.content)}
                      className="h-7 w-7 p-0 rounded-lg hover:bg-blue-50"
                    >
                      <Copy className="h-3 w-3 text-blue-600" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleThumbsUp(message.id)}
                      className="h-7 w-7 p-0 rounded-lg hover:bg-blue-50"
                    >
                      <ThumbsUp className="h-3 w-3 text-blue-600" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleThumbsDown(message.id)}
                      className="h-7 w-7 p-0 rounded-lg hover:bg-blue-50"
                    >
                      <ThumbsDown className="h-3 w-3 text-blue-600" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 rounded-lg hover:bg-blue-50"
                        >
                          <MoreHorizontal className="h-3 w-3 text-blue-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleCopy(message.content)}>
                          Copy message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Regenerate response
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Report message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
  