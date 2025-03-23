// Import necessary modules
import { SearchResult } from '@/components/answer/SearchResultsComponent';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Utility function to get the current timestamp
const getCurrentTimestamp = (): string => new Date().toISOString();

// Define the ChatMessage type
interface ChatMessage {
  id: string;
  content?: string; // Mark content as optional
  timestamp: string;
  type?: string;
  userMessage?: string;
  mentionTool?: string | null;
  file?: string;
  // logo: any;
  images?: never[];
  videos?: never[];
  followUp?: null;
  isStreaming?: boolean;
  searchResults?: SearchResult[];
}

// Define the Chat type
interface Chat {
  id: string;
  title: string;
  description?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Define the state and actions for the Zustand store
interface ChatState {
  chats: Chat[];
  createChat: (chat: { title: string; description?: string }) => Chat;
  getChats: () => Chat[];
  getChatById: (id: any) => Chat | undefined
  updateChat: (id: string, updatedData: Partial<Omit<Chat, 'id' | 'createdAt'>>) => void;
  deleteChat: (id: string) => void;
  clearChats: () => void;

  // Chat messages management
  addMessage: (chatId: string, message: Partial<Omit<ChatMessage, 'id' | 'timestamp'>>) => void;
  updateMessage: (chatId: string, messageId: string, updatedContent: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;

  // Validation functions
  isValidChatId: (chatId: string) => boolean;
}

// Define the store
export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        chats: [],

        // Create a new chat
        createChat: ({ title, description = '' }) => {
          const newChat: Chat = {
            id: crypto.randomUUID(), // Unique ID for the chat
            title,
            description,
            messages: [],
            createdAt: getCurrentTimestamp(),
            updatedAt: getCurrentTimestamp(),
          };
          set({ chats: [...get().chats, newChat] });
          return newChat;
        },

        // Read all chats
        getChats: () => get().chats,
        
        // Read single chat by ID
        getChatById: (id) => get().chats.find(chat => chat.id === id),
        
        // Update a chat by ID
        updateChat: (id, updatedData) => {
          set({
            chats: get().chats.map(chat =>
              chat.id === id
                ? { ...chat, ...updatedData, updatedAt: getCurrentTimestamp() }
                : chat
            ),
          });
        },

        // Delete a chat by ID
        deleteChat: (id) => {
          set({ chats: get().chats.filter(chat => chat.id !== id) });
        },

        // Clear all chats
        clearChats: () => set({ chats: [] }),

        // Add a message to a chat
        addMessage: (chatId: string, message: Partial<Omit<ChatMessage, 'id' | 'timestamp'>>) => {
          set({
            chats: get().chats.map(chat =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: [
                      ...chat.messages,
                      {
                        id: crypto.randomUUID(),
                        content: message.content || '', // Ensure content has a default value
                        ...message,
                        timestamp: getCurrentTimestamp(),
                      },
                    ],
                    updatedAt: getCurrentTimestamp(),
                  }
                : chat
            ),
          });
        },

        // Update a message in a chat
        updateMessage: (chatId, messageId, updatedContent) => {
          set({
            chats: get().chats.map(chat =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: chat.messages.map(message =>
                      message.id === messageId
                        ? { ...message, content: updatedContent }
                        : message
                    ),
                    updatedAt: getCurrentTimestamp(),
                  }
                : chat
            ),
          });
        },

        // Delete a message from a chat
        deleteMessage: (chatId, messageId) => {
          set({
            chats: get().chats.map(chat =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: chat.messages.filter(message => message.id !== messageId),
                    updatedAt: getCurrentTimestamp(),
                  }
                : chat
            ),
          });
        },

          // Validate if a chat ID exists
          isValidChatId: (chatId: string) => {
            return get().chats.some(chat => chat.id === chatId);
          },
      }),
      {
        name: 'chat-storage', // Name of the localStorage key
      }
    )
  )
);
