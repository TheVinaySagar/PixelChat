import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, ChevronLeft, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { createConversation, setActiveConversation } from '../../store/slices/chatSlice'
import { RootState, AppDispatch } from '../../store'

export default function ChatSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const { conversations, activeConversationId } = useSelector((state: RootState) => state.chat)

  const handleNewChat = () => {
    // Set a temporary conversation ID to show welcome screen
    dispatch(setActiveConversation('new-chat'))
  }

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId))
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={cn(
      "bg-background border-r border-border flex flex-col h-full transition-all duration-300",
      isExpanded ? "w-80" : "w-16"
    )}>
      {/* Header */}
      <div className={cn(
        "border-b border-border",
        isExpanded ? "p-6" : "p-3"
      )}>
        {isExpanded ? (
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              Conversations
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 rounded-lg"
              title="Expand sidebar"
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}
        
        {isExpanded && (
          <Button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md rounded-xl h-10 px-6 py-2 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        )}
      </div>

      {/* Conversations List */}
      {isExpanded && (
        <ScrollArea className="flex-1">
          <div className="p-3">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl transition-all duration-200 text-sm group hover:bg-accent/50",
                      activeConversationId === conversation.id
                        ? "bg-accent/80 text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        activeConversationId === conversation.id
                          ? "bg-blue-500"
                          : "bg-muted-foreground/20 group-hover:bg-blue-500/50"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{conversation.title}</p>
                        {conversation.messages.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {conversation.messages[conversation.messages.length - 1].content}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Collapsed state - show only new chat button */}
      {!isExpanded && (
        <div className="p-3 flex flex-col items-center space-y-3">
          <Button
            onClick={handleNewChat}
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-lg"
            title="New Chat"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}