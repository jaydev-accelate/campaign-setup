import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Edit3,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  Send,
  Bot,
  User,
  Sparkles,
  Heart,
  Lightbulb,
  Search,
  RefreshCw,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  Settings,
  Download,
  Copy,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface ScriptSection {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  duration: string;
  tags: string[];
  isEditing?: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  scriptSuggestions?: {
    section: string;
    newContent: string;
    reason: string;
  }[];
}

const initialScriptSections: ScriptSection[] = [
  {
    id: 'welcome',
    title: '1 - Welcome Journey',
    content: 'Welcome, dear friend, to a moment woven just for you—a sacred space to return home to the deepest part of yourself. Today, we invite you into Emerald Serenity, a journey designed to open your heart, to heal, to connect, and to love freely.',
    wordCount: 44,
    duration: '14s',
    tags: ['Emerald Serenity', 'Empathic Resonance Practice', 'Self-Compassion Practices', 'Compassionate Communication', 'Healing Affirmations', 'Acceptance', 'The Friend']
  },
  {
    id: 'struggles',
    title: '2 - Acknowledging Struggles',
    content: 'Perhaps you find yourself navigating the tender landscape of grief, a loss that sits heavy, or perhaps old emotional wounds from past relationships still echo within you, making connection feel distant. Maybe it\'s not grief but the absence of it—feeling disconnected, a struggle with self-acceptance, a whisper of unworthiness that keeps your heart guarded. I understand how hard this can be. Each one of us at one time together, acknowledging any lingering bitterness or fear of intimacy that might be present. This is a moment of deep understanding and acceptance. <break time="1.5s"/>',
    wordCount: 97,
    duration: '30s',
    tags: ['Resilience', 'Empathic Resonance Practice', 'Relaxed Vigilance', 'Emerald Serenity', 'Self-Compassion Practices', 'Compassionate Communication', 'Self-Compassion Journaling', 'Acceptance', 'The Healer']
  }
];

const ScriptManager: React.FC = () => {
  const [scriptSections, setScriptSections] = useState<ScriptSection[]>(initialScriptSections);
  const [selectedSection, setSelectedSection] = useState<string>('welcome');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m Aurelia AI Pro, your partner for smarter, smoother wellness scripts. Let\'s shape magic together!',
      timestamp: new Date(),
      suggestions: [
        'Give me 5 fresh ideas to start my script differently.',
        'Suggest vivid imagery to deepen listener relaxation.',
        'Make my script sound warmer and more supportive.',
        'Show More'
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'Your Creative Journey',
    'Here are 5 fresh ideas to star...',
    'Your script already sounds w...',
    'Here are 5 fresh and surprisin...',
    'Show More'
  ];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSectionEdit = (sectionId: string, newContent: string) => {
    setScriptSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: newContent, wordCount: newContent.split(' ').length }
        : section
    ));
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiResponse = "";
      let suggestions: string[] = [];
      let scriptSuggestions: { section: string; newContent: string; reason: string }[] = [];

      if (userMessage.toLowerCase().includes('improve') || userMessage.toLowerCase().includes('better')) {
        aiResponse = "I'd love to help improve your script! I can see you're working on the welcome section. Here are some enhancements that could make it more engaging and emotionally resonant.";
        scriptSuggestions = [
          {
            section: 'Welcome Journey',
            newContent: 'Welcome, beautiful soul, to this sanctuary of healing—a space crafted with tender intention just for you. Today, we embark on Emerald Serenity together, a gentle journey that will awaken your heart\'s deepest wisdom and guide you home to yourself.',
            reason: 'More personalized and emotionally engaging opening'
          }
        ];
        suggestions = ['Apply this suggestion', 'Show more variations', 'Customize further', 'Preview changes'];
      } else if (userMessage.toLowerCase().includes('warmer') || userMessage.toLowerCase().includes('supportive')) {
        aiResponse = "Great direction! Making the script warmer will create deeper emotional connection. Here are some ways to add more warmth and support to your current content.";
        suggestions = ['Add gentle affirmations', 'Include nurturing language', 'Create safety cues', 'Build emotional bridges'];
      } else if (userMessage.toLowerCase().includes('imagery') || userMessage.toLowerCase().includes('visualization')) {
        aiResponse = "Vivid imagery can transform your script! Let me suggest some beautiful visualizations that align with your Emerald Serenity theme.";
        suggestions = ['Nature-based imagery', 'Heart-centered visualizations', 'Grounding metaphors', 'Sensory experiences'];
      } else {
        aiResponse = `I can help you enhance "${scriptSections.find(s => s.id === selectedSection)?.title}" in many ways. What specific aspect would you like to focus on?`;
        suggestions = ['Improve emotional impact', 'Add guided visualizations', 'Enhance flow and pacing', 'Strengthen key messages'];
      }

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions,
        scriptSuggestions: scriptSuggestions.length > 0 ? scriptSuggestions : undefined
      };

      setChatMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    simulateAIResponse(chatInput);
    setChatInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatInput(suggestion);
  };

  const handleApplyScriptSuggestion = (suggestion: { section: string; newContent: string; reason: string }) => {
    const sectionId = scriptSections.find(s => s.title.includes(suggestion.section))?.id;
    if (sectionId) {
      handleSectionEdit(sectionId, suggestion.newContent);
      toast.success(`Applied AI suggestion to ${suggestion.section}`);
      
      const confirmMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Perfect! I've updated your "${suggestion.section}" section. The new content is more ${suggestion.reason.toLowerCase()}. Would you like me to suggest improvements for other sections too?`,
        timestamp: new Date(),
        suggestions: ['Improve next section', 'Add transitions', 'Enhance overall flow', 'Create variations']
      };
      
      setChatMessages(prev => [...prev, confirmMessage]);
    }
  };

  const selectedSectionData = scriptSections.find(s => s.id === selectedSection);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" className="p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Main Script</span>
              <span className="text-xs text-gray-500">Version 1</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Personalized Editions</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                New Campaign
              </Button>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 py-2 border-b border-gray-200">
          <Tabs defaultValue="plan" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-8">
              <TabsTrigger value="plan" className="text-xs">Plan</TabsTrigger>
              <TabsTrigger value="journey" className="text-xs">Journey</TabsTrigger>
              <TabsTrigger value="path" className="text-xs">Path</TabsTrigger>
              <TabsTrigger value="story" className="text-xs">Story</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Script Settings */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium mb-1">Duration</div>
              <div className="text-xs text-gray-600">5 Minutes</div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1">Personalization</div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Age Range: 35-44</div>
                <div>Gender: Female</div>
                <div>Healthcare Worker</div>
                <div>Career Change</div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
            Save
          </Button>
        </div>

        {/* Script Sections */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium">Script Layout</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600">
                Refine Script Layout
              </Button>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Let Aurelia AI reorganize and rewrite your script here to together flow and coherence.
            </p>
          </div>
          
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2">
              {scriptSections.map((section) => (
                <div 
                  key={section.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSection === section.id 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-medium">{section.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{section.wordCount} Words</span>
                      <span>{section.duration}</span>
                      <CheckCircle2 className="w-3 h-3" />
                      <Heart className="w-3 h-3" />
                      <MoreHorizontal className="w-3 h-3" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {section.content}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {section.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {section.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{section.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-xs">
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="text-xs">
                Select All
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Deselect All
              </Button>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>5 Minutes</span>
                <span>0 / 971 Words Selected</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Script Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-6">
            {selectedSectionData && (
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">{selectedSectionData.title}</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{selectedSectionData.wordCount} Words</span>
                        <span>•</span>
                        <span>{selectedSectionData.duration}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="leading-relaxed text-gray-800">
                      {selectedSectionData.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {selectedSectionData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {scriptSections.filter(s => s.id !== selectedSection).map((section) => (
                  <div key={section.id} className="mb-8 pb-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{section.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{section.wordCount} Words</span>
                        <span>•</span>
                        <span>{section.duration}</span>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedSection(section.id)}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="leading-relaxed text-gray-700">
                        {section.content}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {section.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {section.tags.length > 5 && (
                        <span className="text-xs text-gray-500">+{section.tags.length - 5} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Right Sidebar - AI Chat */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Aurelia AI Pro</h3>
              <p className="text-xs text-gray-600">Your AI partner for smarter, smoother wellness scripts. Let's shape magic together!</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="space-y-2">
            {[
              'Give me 5 fresh ideas to start my script differently.',
              'Suggest vivid imagery to deepen listener relaxation.',
              'Make my script sound warmer and more supportive.'
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-2 text-xs text-gray-700 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-xs text-gray-600">
              Show More
            </Button>
          </div>
        </div>

        {/* Creative Journey Section */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium mb-3">Your Creative Journey</h4>
          <div className="space-y-2">
            {quickSuggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="text-gray-600">{suggestion}</span>
                <span className="text-gray-400 ml-auto">
                  {idx < 3 ? '75 Jul' : '1h'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div ref={chatScrollRef} className="space-y-4">
              {chatMessages.map((message) => (
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
                    <div className={`inline-block p-3 rounded-lg max-w-[240px] ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-xs">{message.content}</div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>

                    {/* Script Suggestions */}
                    {message.scriptSuggestions && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Script Improvements:
                        </div>
                        {message.scriptSuggestions.map((suggestion, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-purple-50 rounded border border-purple-200"
                          >
                            <div className="text-xs font-medium text-purple-900 mb-1">
                              {suggestion.section}
                            </div>
                            <div className="text-xs text-purple-700 mb-2 line-clamp-3">
                              {suggestion.newContent}
                            </div>
                            <div className="text-xs text-purple-600 mb-2">
                              {suggestion.reason}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleApplyScriptSuggestion(suggestion)}
                              className="h-6 px-2 text-xs bg-purple-600 hover:bg-purple-700"
                            >
                              Apply Suggestion
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Regular Suggestions */}
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

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-3">
            {/* AI Agents Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">AI Agents</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <RefreshCw className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="hey they chat..."
                  className="text-xs pr-8"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                >
                  <Search className="w-3 h-3" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="h-8 w-8 p-0 bg-orange-600 hover:bg-orange-700"
              >
                <Send className="h-3 h-3" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <MessageSquare className="w-3 h-3 mr-1" />
                Quick Fix
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                Explain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptManager;