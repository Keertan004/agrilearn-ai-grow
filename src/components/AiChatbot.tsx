
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
import { analyzePlantDisease } from "@/services/plantDiseaseService";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  image?: string;
  isProcessing?: boolean;
  diseaseResult?: {
    name: string;
    cure: string;
    prevention: string;
    confidence?: number;
  };
};

const AiChatbot = () => {
  const navigate = useNavigate();
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file (JPG, PNG, etc)",
        variant: "destructive"
      });
      return;
    }
    
    // Create image message preview
    const reader = new FileReader();
    reader.onload = async () => {
      const imagePreview = reader.result as string;
      
      // Add initial image message
      const userMessageId = messages.length + 1;
      const userMessage = { 
        id: userMessageId, 
        text: "I've uploaded an image of my plant for disease analysis.", 
        isUser: true,
        image: imagePreview,
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Initial response acknowledging the upload
      const initialBotMessage = {
        id: messages.length + 2,
        text: "I've received your plant image. Analyzing for signs of disease...",
        isUser: false,
        isProcessing: true
      };
      
      setMessages(prevMessages => [...prevMessages, initialBotMessage]);
      
      try {
        // Use the existing plant disease service to analyze the image
        const diseaseResult = await analyzePlantDisease(imagePreview);
        
        // Create result message with the disease information
        const resultMessage = {
          id: messages.length + 3,
          text: `Based on my analysis, I've identified this as: ${diseaseResult.name} (${diseaseResult.confidence}% confidence).

Treatment: ${diseaseResult.cure}

Prevention: ${diseaseResult.prevention}

Would you like to see more detailed information about this disease?`,
          isUser: false,
          diseaseResult: diseaseResult
        };
        
        // Replace the processing message with the result
        setMessages(prevMessages => prevMessages.map(msg => 
          msg.isProcessing ? resultMessage : msg
        ));
        
        setIsTyping(false);
      } catch (error) {
        console.error("Error analyzing plant disease:", error);
        
        // Replace the processing message with an error message
        const errorMessage = {
          id: messages.length + 3,
          text: "I'm having trouble analyzing this image. For a more detailed analysis, you might want to try our Disease Detection tool. Would you like me to take you there?",
          isUser: false
        };
        
        setMessages(prevMessages => prevMessages.map(msg => 
          msg.isProcessing ? errorMessage : msg
        ));
        
        setIsTyping(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDiseaseDetectionClick = () => {
    setIsOpen(false); // Close the chatbot
    navigate('/disease-detection'); // Navigate to disease detection page
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
                  <div className="whitespace-pre-line">{msg.text}</div>
                  
                  {msg.diseaseResult && (
                    <div className="mt-3">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full"
                        onClick={handleDiseaseDetectionClick}
                      >
                        View Detailed Analysis
                      </Button>
                    </div>
                  )}
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
                title="Upload plant image for disease detection"
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
