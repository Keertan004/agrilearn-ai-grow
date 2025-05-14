
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription
} from "@/components/ui/sheet";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AgriLearnNetwork assistant. How can I help you with farming today?", isUser: false },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newUserMessage = { id: messages.length + 1, text: message, isUser: true };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "I can help you identify plant diseases. Would you like to upload an image?",
        "For crop suggestions, please share your location and the current season.",
        "I can provide soil management advice based on your soil parameters.",
        "Would you like to check the weather forecast for your farm?",
        "Feel free to ask me any farming questions!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const newBotMessage = { 
        id: messages.length + 2, 
        text: randomResponse, 
        isUser: false 
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%] sm:w-[440px] flex flex-col h-[80vh]">
          <SheetHeader>
            <SheetTitle>AgriLearnNetwork Assistant</SheetTitle>
            <SheetDescription>
              Ask me anything about farming, plant diseases, or crops.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.isUser 
                      ? 'bg-agri-green text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <SheetFooter className="border-t pt-4">
            <div className="flex items-center w-full">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 mr-2"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AiChatbot;
