
import React, { useState, useRef, useEffect } from 'react';
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
import { MessageSquare, Send, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { generateChatbotResponse } from "@/services/chatbotService";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  image?: string;
};

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AgriLearnNetwork assistant. How can I help you with farming today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newUserMessage = { id: messages.length + 1, text: message, isUser: true };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate response after a short delay to simulate thinking
    setTimeout(() => {
      const botResponse = generateChatbotResponse(message);
      const newBotMessage = { 
        id: messages.length + 2, 
        text: botResponse, 
        isUser: false 
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      return;
    }
    
    // Create image message preview
    const reader = new FileReader();
    reader.onload = () => {
      const imagePreview = reader.result as string;
      
      // Add image message
      const newUserMessage = { 
        id: messages.length + 1, 
        text: "I've uploaded an image of my plant.", 
        isUser: true,
        image: imagePreview
      };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Generate response after a delay
      setTimeout(() => {
        const botResponse = "Thank you for sharing this plant image. It appears to show some signs of stress. I'd recommend uploading it to our Disease Detection tool for a more detailed analysis. Would you like to try that?";
        const newBotMessage = { 
          id: messages.length + 2, 
          text: botResponse, 
          isUser: false 
        };
        
        setMessages(prevMessages => [...prevMessages, newBotMessage]);
        setIsTyping(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
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
                  {msg.image && (
                    <div className="mb-2">
                      <img 
                        src={msg.image} 
                        alt="Uploaded plant" 
                        className="rounded-lg max-h-48 w-auto"
                      />
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <SheetFooter className="border-t pt-4">
            <div className="flex items-center w-full">
              <Button 
                size="icon" 
                variant="ghost" 
                className="mr-1" 
                onClick={triggerImageUpload}
              >
                <Image className="h-4 w-4" />
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
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
