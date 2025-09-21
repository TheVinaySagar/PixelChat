import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, ChevronDown, ChevronRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createConversation, setActiveConversation } from '../../store/slices/chatSlice'
import { RootState, AppDispatch } from '../../store'

export default function ChatSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const { conversations, activeConversationId } = useSelector((state: RootState) => state.chat)

  const handleNewChat = () => {
    const id = Date.now().toString()
    dispatch(createConversation({ id, title: 'New Chat' }))
  }

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId))
  }

  return (
    <div className="w-80 bg-chat-sidebar border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">AI Chat</h1>
      </div>

      {/* Conversations Section */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors w-full text-left"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Conversations
          </button>
        </div>

        {isExpanded && (
          <>
            {/* New Chat Button */}
            <div className="px-4 mb-4">
              <Button
                onClick={handleNewChat}
                className="w-full justify-start gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
            </div>

            {/* Conversations List */}
            <div className="px-4 flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-colors text-sm",
                        "hover:bg-secondary/50",
                        activeConversationId === conversation.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{conversation.title}</span>
                      </div>
                      {conversation.messages.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {conversation.messages[conversation.messages.length - 1].content}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}