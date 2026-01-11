import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types matched to the server implementation
interface Conversation {
  id: number;
  title: string;
  createdAt: string;
}

interface Message {
  id: number;
  role: 'user' | 'model' | 'assistant'; // assistant is mapped from model in some integrations
  content: string;
  createdAt: string;
}

interface ConversationDetail extends Conversation {
  messages: Message[];
}

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ['/api/conversations'],
    queryFn: async () => {
      const res = await fetch('/api/conversations');
      if (!res.ok) throw new Error('Failed to fetch conversations');
      return res.json();
    }
  });
}

export function useConversation(id: number | null) {
  return useQuery<ConversationDetail>({
    queryKey: ['/api/conversations', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/conversations/${id}`);
      if (!res.ok) throw new Error('Failed to fetch conversation');
      return res.json();
    },
    enabled: !!id
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!res.ok) throw new Error('Failed to create conversation');
      return res.json() as Promise<Conversation>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
    }
  });
}

export function useChatStream(conversationId: number | null) {
  const [streamedContent, setStreamedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const queryClient = useQueryClient();
  
  const sendMessage = async (content: string) => {
    if (!conversationId) return;
    
    setIsStreaming(true);
    setStreamedContent('');
    
    // Optimistic update for user message
    queryClient.setQueryData<ConversationDetail>(['/api/conversations', conversationId], (old) => {
      if (!old) return old;
      return {
        ...old,
        messages: [
          ...old.messages,
          { id: Date.now(), role: 'user', content, createdAt: new Date().toISOString() }
        ]
      };
    });

    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

      if (!res.ok) throw new Error('Failed to send message');
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessageContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMessageContent += data.content;
                setStreamedContent(prev => prev + data.content);
              }
              if (data.done) {
                setIsStreaming(false);
                // Invalidate to get the saved message from DB
                queryClient.invalidateQueries({ queryKey: ['/api/conversations', conversationId] });
              }
            } catch (e) {
              console.error('Error parsing SSE:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream error:', error);
      setIsStreaming(false);
    }
  };

  return { sendMessage, streamedContent, isStreaming };
}
