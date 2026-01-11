import { Navigation } from "@/components/Navigation";
import { useChatStream, useCreateConversation, useConversation, useConversations } from "@/hooks/use-chat";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [input, setInput] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  
  const { data: conversations, isLoading: isLoadingConversations } = useConversations();
  const createConversation = useCreateConversation();
  const { data: conversationDetail, isLoading: isLoadingMessages } = useConversation(selectedConversationId);
  const { sendMessage, streamedContent, isStreaming } = useChatStream(selectedConversationId);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationDetail?.messages, streamedContent]);

  // Create initial conversation if none exist or selected
  const handleNewChat = () => {
    createConversation.mutate("New Chat", {
      onSuccess: (newConv) => {
        setSelectedConversationId(newConv.id);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedConversationId) return;
    sendMessage(input);
    setInput("");
  };

  // Combine DB messages with current stream
  const allMessages = [
    ...(conversationDetail?.messages || []),
  ];

  if (isStreaming && streamedContent) {
    // Only add if we don't already have this assistant message
    // Simplification: We just render streamed content as a pending message at the end
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      <Navigation />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pb-4 flex gap-6 h-[calc(100vh-100px)]">
        
        {/* Sidebar - Chat History */}
        <div className="hidden md:flex flex-col w-64 bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <button 
              onClick={handleNewChat}
              className="w-full py-3 px-4 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Chat
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoadingConversations ? (
              <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
            ) : (
              conversations?.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3",
                    selectedConversationId === conv.id 
                      ? "bg-secondary text-secondary-foreground" 
                      : "text-muted-foreground hover:bg-secondary/50"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-3xl border border-border/50 shadow-sm flex flex-col overflow-hidden relative">
          
          {!selectedConversationId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 text-primary animate-pulse">
                <Bot className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to MindPal</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                I'm here to listen and support you. Start a new conversation to begin.
              </p>
              <button 
                onClick={handleNewChat}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Start Conversation
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {isLoadingMessages ? (
                  <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
                ) : (
                  <>
                    {allMessages.map((msg) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id} 
                        className={cn(
                          "flex gap-4 max-w-3xl",
                          msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          msg.role === 'user' ? "bg-primary text-white" : "bg-secondary text-primary"
                        )}>
                          {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </div>
                        
                        <div className={cn(
                          "p-4 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed prose prose-sm max-w-none",
                          msg.role === 'user' 
                            ? "bg-primary text-white rounded-tr-none prose-invert" 
                            : "bg-secondary/30 text-foreground rounded-tl-none"
                        )}>
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </motion.div>
                    ))}

                    {/* Streaming Message */}
                    {isStreaming && streamedContent && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 max-w-3xl"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary/30 text-foreground rounded-tl-none shadow-sm text-sm sm:text-base leading-relaxed prose prose-sm max-w-none">
                          <ReactMarkdown>{streamedContent}</ReactMarkdown>
                          <span className="inline-block w-2 h-4 bg-primary/50 ml-1 animate-pulse" />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Disclaimer */}
              <div className="px-6 py-2 bg-yellow-50/50 text-center border-t border-yellow-100">
                <p className="text-xs text-yellow-700 font-medium">
                  Disclaimer: I am an AI, not a professional. In emergencies, call <a href="tel:988" className="underline font-bold">988</a>.
                </p>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50 bg-white">
                <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-secondary/20 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-muted-foreground"
                    disabled={isStreaming}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isStreaming}
                    className="px-4 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isStreaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
