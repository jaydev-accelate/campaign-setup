import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Bot,
  User,
  Search,
  MessageSquare,
  Settings,
  Share,
  Play,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  dataPoints?: {
    type: string;
    value: string;
    category: string;
  }[];
}

interface ChatInterfaceProps {
  currentConcept?: string;
  selectedConcepts?: Set<string>;
  onAddDataPoint?: (dataPoint: { type: string; value: string; category: string }) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  currentConcept = "Foundational Grounding", 
  selectedConcepts = new Set(),
  onAddDataPoint 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    "Give me 5 fresh ideas to start my script differently.",
    "Suggest vivid imagery to deepen listener relaxation.",
    "Make my script sound warmer and more supportive."
  ];

  const creativeJourney = [
    { text: "Your Creative Journey", date: "" },
    { text: "Here are 5 fresh ideas to star...", date: "75 Jul" },
    { text: "Your script already sounds w...", date: "75 Jul" },
    { text: "Here are 5 fresh and surprisin...", date: "1h" },
    { text: "Show More", date: "1h" }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiResponse = "";
      let suggestions: string[] = [];
      let dataPoints: { type: string; value: string; category: string }[] = [];

      if (userMessage.toLowerCase().includes('add') || userMessage.toLowerCase().includes('new')) {
        aiResponse = "I'd be happy to help you add new data points! Based on your current selection, I can suggest several enhancements for your wellness campaign.";
        dataPoints = [
          { type: "Practice", value: "5-minute grounding meditation", category: "Mindfulness" },
          { type: "Affirmation", value: "I am rooted and secure in my being", category: "Self-talk" },
          { type: "Exercise", value: "Barefoot earth connection", category: "Physical" }
        ];
        suggestions = ["Add all suggestions", "Customize duration", "Add more practices", "Create variations"];
      } else if (userMessage.toLowerCase().includes('explain') || userMessage.toLowerCase().includes('deeper')) {
        aiResponse = `${currentConcept} is about establishing a deep connection with your sense of security and stability. This concept helps individuals feel anchored and present, which is essential for overall well-being. Would you like me to elaborate on specific aspects or add related therapeutic approaches?`;
        suggestions = ["Add therapeutic techniques", "Include research backing", "Create assessment tools", "Generate user stories"];
      } else if (userMessage.toLowerCase().includes('fresh ideas') || userMessage.toLowerCase().includes('start')) {
        aiResponse = "Here are 5 fresh and creative ways to start your wellness script that will immediately engage your listeners and create a welcoming atmosphere.";
        dataPoints = [
          { type: "Opening", value: "Begin with a gentle sound meditation", category: "Audio Technique" },
          { type: "Opening", value: "Start with personalized breathing rhythm", category: "Breathing" },
          { type: "Opening", value: "Use nature-based grounding imagery", category: "Visualization" }
        ];
        suggestions = ["Apply these openings", "Create variations", "Add personal touch", "Test different approaches"];
      } else {
        aiResponse = `That's an interesting point about ${currentConcept}. I can help you explore this further or add specific enhancements to your campaign. What aspect would you like to focus on?`;
        suggestions = ["Dive deeper", "Add practical tools", "Create assessments", "Generate content"];
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions,
        dataPoints: dataPoints.length > 0 ? dataPoints : undefined
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(inputValue);
    setInputValue('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(suggestion);
  };

  const handleAddDataPoint = (dataPoint: { type: string; value: string; category: string }) => {
    onAddDataPoint?.(dataPoint);
    
    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `Great! I've added "${dataPoint.value}" to your ${dataPoint.category} data points. This will enhance your wellness campaign with more personalized content.`,
      timestamp: new Date(),
      suggestions: ["Add more similar items", "Customize this further", "Preview the impact"]
    };
    
    setMessages(prev => [...prev, confirmMessage]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
            
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col"
          >
            {/* Header with toolbar */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                  <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center text-xs">A</div>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Play className="h-4 w-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs h-7 px-3">
                  Publish
                </Button>
                <Button size="sm" className="text-xs h-7 px-3 bg-blue-600 hover:bg-blue-700">
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Aurelia AI Pro Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Aurelia AI Pro</h3>
                  <p className="text-sm text-gray-600">Your AI partner for smarter, smoother wellness scripts. Let's shape magic together!</p>
                </div>
              </div>
            </div>

            {/* Quick Suggestion Buttons */}
            <div className="p-4 space-y-3 border-b border-gray-200">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
              <Button variant="ghost" className="w-full text-sm text-gray-600">
                Show More
              </Button>
            </div>

            {/* Your Creative Journey */}
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-medium mb-3">Your Creative Journey</h4>
              <div className="space-y-2">
                {creativeJourney.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className={`text-sm ${idx === 0 ? 'font-medium' : 'text-gray-600'}`}>
                      {item.text}
                    </span>
                    {item.date && (
                      <span className="text-xs text-gray-400">{item.date}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <div ref={scrollAreaRef} className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-[280px] ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="text-sm">{message.content}</div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>

                        {/* Data Points Suggestions */}
                        {message.dataPoints && (
                          <div className="mt-3 space-y-2">
                            <div className="text-xs font-medium text-gray-600">
                              Suggested enhancements:
                            </div>
                            {message.dataPoints.map((dataPoint, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200 hover:bg-purple-100 transition-colors"
                              >
                                <div className="flex-1">
                                  <div className="text-xs font-medium text-purple-900">
                                    {dataPoint.value}
                                  </div>
                                  <div className="text-xs text-purple-600">
                                    {dataPoint.type} • {dataPoint.category}
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAddDataPoint(dataPoint)}
                                  className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                                >
                                  Add
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && message.type === 'ai' && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="h-6 px-2 text-xs text-gray-600 hover:text-gray-900 border-gray-300"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-block p-3 bg-gray-100 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Bottom Avatar */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-600">Hello! How can I help you?</span>
              </div>
            </div>

            {/* AI Agents and Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="space-y-3">
                {/* AI Agents Header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Agents</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <RefreshCw className="w-3 h-3 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="w-3 h-3 text-gray-500" />
                    </Button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="hey they chat..."
                      className="text-sm pr-8"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    >
                      <Search className="w-3 h-3 text-gray-500" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="h-8 w-8 p-0 bg-orange-600 hover:bg-orange-700 rounded"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-600">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Quick Fix
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-600">
                    Explain
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatInterface;