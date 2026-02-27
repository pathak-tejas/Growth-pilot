import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "How to increase sales",
      messages: [
        {
          id: "1",
          text: "How can I increase my monthly sales?",
          isUser: true,
          timestamp: new Date(),
        },
        {
          id: "2",
          text: "Based on your store data, I recommend: 1) Increase marketing budget by 20%, 2) Optimize product pricing, 3) Launch customer loyalty program.",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
  ]);

  const [currentConversationId, setCurrentConversationId] = useState("1");
  const [inputValue, setInputValue] = useState("");

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );

  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    const response: Message = {
      id: (Date.now() + 1).toString(),
      text: "This is an AI-generated response. In production, this would be powered by OpenAI or similar.",
      isUser: false,
      timestamp: new Date(),
    };

    setConversations(
      conversations.map((c) => {
        if (c.id === currentConversationId) {
          return {
            ...c,
            messages: [...c.messages, newMessage, response],
          };
        }
        return c;
      })
    );

    setInputValue("");
  };

  const handleNewConversation = () => {
    const newId = Date.now().toString();
    setConversations([
      ...conversations,
      {
        id: newId,
        title: "New Conversation",
        messages: [],
      },
    ]);
    setCurrentConversationId(newId);
  };

  const handleDeleteConversation = (id: string) => {
    const filtered = conversations.filter((c) => c.id !== id);
    setConversations(filtered);
    if (currentConversationId === id && filtered.length > 0) {
      setCurrentConversationId(filtered[0].id);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-200px)] gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <Button onClick={handleNewConversation} className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversationId(conv.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                  currentConversationId === conv.id ? "bg-purple-50" : ""
                }`}
              >
                <span className="text-sm font-medium text-gray-900 truncate">
                  {conv.title}
                </span>
                <Trash2
                  className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conv.id);
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          {currentConversation ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentConversation.messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">
                        Start a conversation with your AI advisor
                      </p>
                    </div>
                  </div>
                ) : (
                  currentConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-lg ${
                          msg.isUser
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask your AI advisor..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 2 credits per message
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a conversation to continue</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
