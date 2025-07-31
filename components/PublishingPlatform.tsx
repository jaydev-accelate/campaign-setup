import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { 
  Upload,
  Download,
  Play,
  Pause,
  Volume2,
  Mic,
  Music,
  Image,
  Video,
  FileText,
  Wand2,
  Sparkles,
  Eye,
  Share,
  Settings,
  Palette,
  Brain,
  Heart,
  Target,
  Clock,
  Globe,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  X,
  RefreshCw,
  Copy,
  Edit3,
  BarChart3,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lightbulb,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import figmaImage1 from 'figma:asset/0593a31fd003dfcd7c73c99852ed84afbaa30c61.png';
import figmaImage2 from 'figma:asset/b8435534d3f9033d4852bbf3dc1b5fd5660597bd.png';
import figmaImage3 from 'figma:asset/54863182954c2006c3c4ca649b3b961c284291ba.png';

interface SemanticPrompt {
  id: string;
  type: 'voice' | 'music' | 'image' | 'video';
  content: string;
  extractedConcepts: string[];
  emotionalTone: string;
  aureliaElements: string[];
  generatedAssets: GeneratedAsset[];
}

interface GeneratedAsset {
  id: string;
  type: 'voice' | 'music' | 'image' | 'video';
  name: string;
  status: 'generating' | 'ready' | 'error';
  progress: number;
  url?: string;
  metadata: {
    duration?: string;
    size: string;
    format: string;
    quality: 'draft' | 'professional' | 'premium';
    semanticContext: string[];
    aureliaAlignment: number;
    emotionalResonance: number;
  };
  professionalFeatures: {
    clientCustomization: boolean;
    brandingOptions: boolean;
    qualityVariants: string[];
    platformOptimization: string[];
  };
}

interface PublishConfiguration {
  title: string;
  description: string;
  visibility: 'draft' | 'public' | 'professional' | 'client-only';
  platforms: string[];
  exportFormats: {
    text: boolean;
    voice: boolean;
    music: boolean;
    images: boolean;
    videos: boolean;
    interactive: boolean;
  };
  professionalSettings: {
    clientBranding: boolean;
    multiLanguage: boolean;
    qualityTiers: string[];
    analytics: boolean;
    customization: boolean;
  };
}

const PublishingPlatform: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'create' | 'preview' | 'export' | 'analytics'>('create');
  const [scriptContent, setScriptContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['voice']);

  // Sample script content from the wellness session
  const sampleScript = `Begin at the crown of your head and feel this gentle, cooling flow enter.

Imagine it moving down, like a shimmering stream, flowing over your brain, bringing clarity and calm.

It cascades down your neck, releasing any tension there, carrying away worries.`;

  // Semantic prompts extracted from script
  const semanticPrompts: SemanticPrompt[] = [
    {
      id: 'voice-main',
      type: 'voice',
      content: sampleScript,
      extractedConcepts: ['gentle guidance', 'flowing energy', 'calming presence', 'tension release'],
      emotionalTone: 'nurturing, peaceful, grounding',
      aureliaElements: ['Root Chakra', 'Grounding Techniques', 'Energy Flow'],
      generatedAssets: []
    },
    {
      id: 'music-ambient',
      type: 'music',
      content: 'Compose soundscape for crown chakra energy flow meditation',
      extractedConcepts: ['flowing water', 'gentle descent', 'brain clarity', 'tension release'],
      emotionalTone: 'serene, fluid, cleansing',
      aureliaElements: ['Crown Chakra', 'Energy Visualization', 'Healing Frequencies'],
      generatedAssets: []
    },
    {
      id: 'visual-spine',
      type: 'image',
      content: 'Spine visualization with golden energy flow from crown to base',
      extractedConcepts: ['luminous spine', 'energy cascade', 'anatomical accuracy', 'spiritual essence'],
      emotionalTone: 'mystical, healing, profound',
      aureliaElements: ['Chakra System', 'Anatomical Grounding', 'Light Therapy'],
      generatedAssets: []
    },
    {
      id: 'video-journey',
      type: 'video',
      content: 'Visual journey of energy flowing through the body systems',
      extractedConcepts: ['energy movement', 'body systems', 'healing flow', 'transformation'],
      emotionalTone: 'transformative, gentle, empowering',
      aureliaElements: ['Full Body Integration', 'Holistic Healing', 'Energy Medicine'],
      generatedAssets: []
    }
  ];

  // Generated assets based on semantic analysis
  const generatedAssets: GeneratedAsset[] = [
    {
      id: 'voice-nurturing-female',
      type: 'voice',
      name: 'Nurturing Guide Voice',
      status: 'ready',
      progress: 100,
      url: '/generated/voice-nurturing.mp3',
      metadata: {
        duration: '8:34',
        size: '12.4 MB',
        format: 'MP3 (320kbps)',
        quality: 'premium',
        semanticContext: ['gentle guidance', 'maternal comfort', 'healing presence'],
        aureliaAlignment: 95,
        emotionalResonance: 92
      },
      professionalFeatures: {
        clientCustomization: true,
        brandingOptions: true,
        qualityVariants: ['Draft (128kbps)', 'Professional (256kbps)', 'Premium (320kbps)'],
        platformOptimization: ['Podcast', 'App', 'Website', 'Therapy Sessions']
      }
    },
    {
      id: 'voice-wise-male',
      type: 'voice',
      name: 'Wise Teacher Voice',
      status: 'ready',
      progress: 100,
      url: '/generated/voice-wise.mp3',
      metadata: {
        duration: '8:34',
        size: '12.4 MB',
        format: 'MP3 (320kbps)',
        quality: 'premium',
        semanticContext: ['ancient wisdom', 'grounding presence', 'deep knowing'],
        aureliaAlignment: 88,
        emotionalResonance: 89
      },
      professionalFeatures: {
        clientCustomization: true,
        brandingOptions: true,
        qualityVariants: ['Draft', 'Professional', 'Premium'],
        platformOptimization: ['Meditation Apps', 'Corporate Wellness', 'Healthcare']
      }
    },
    {
      id: 'music-crown-flow',
      type: 'music',
      name: 'Crown Chakra Flow Soundscape',
      status: 'generating',
      progress: 73,
      metadata: {
        duration: '10:00',
        size: '18.7 MB',
        format: 'WAV (48kHz)',
        quality: 'professional',
        semanticContext: ['crystalline tones', 'flowing water', 'high frequency healing'],
        aureliaAlignment: 91,
        emotionalResonance: 87
      },
      professionalFeatures: {
        clientCustomization: false,
        brandingOptions: false,
        qualityVariants: ['Background Mix', 'Instrumental Only', 'Nature Enhanced'],
        platformOptimization: ['Streaming', 'Download', 'Live Sessions']
      }
    },
    {
      id: 'image-spine-energy',
      type: 'image',
      name: 'Luminous Spine Visualization',
      status: 'ready',
      progress: 100,
      url: figmaImage1,
      metadata: {
        size: '2.3 MB',
        format: 'PNG (1920x1080)',
        quality: 'premium',
        semanticContext: ['anatomical accuracy', 'spiritual essence', 'golden light', 'energy flow'],
        aureliaAlignment: 97,
        emotionalResonance: 94
      },
      professionalFeatures: {
        clientCustomization: true,
        brandingOptions: true,
        qualityVariants: ['Web (1080p)', 'Print (4K)', 'Mobile (720p)', 'Presentation (16:9)'],
        platformOptimization: ['Website Headers', 'App Backgrounds', 'Presentation Slides', 'Print Materials']
      }
    },
    {
      id: 'video-energy-journey',
      type: 'video',
      name: 'Energy Flow Journey',
      status: 'generating',
      progress: 45,
      metadata: {
        duration: '8:34',
        size: '124.8 MB',
        format: 'MP4 (1080p)',
        quality: 'professional',
        semanticContext: ['energy movement', 'body systems', 'healing visualization', 'transformation'],
        aureliaAlignment: 89,
        emotionalResonance: 86
      },
      professionalFeatures: {
        clientCustomization: true,
        brandingOptions: true,
        qualityVariants: ['4K Premium', '1080p Professional', '720p Web', '480p Mobile'],
        platformOptimization: ['YouTube', 'Vimeo', 'Apps', 'Presentations', 'Social Media']
      }
    }
  ];

  // Professional export configuration
  const [publishConfig, setPublishConfig] = useState<PublishConfiguration>({
    title: 'Crown Chakra Energy Flow Meditation',
    description: 'A guided meditation focusing on energy flow from crown to root chakra for grounding and clarity.',
    visibility: 'professional',
    platforms: ['Wellness Apps', 'Professional Practice', 'Online Courses'],
    exportFormats: {
      text: true,
      voice: true,
      music: true,
      images: true,
      videos: true,
      interactive: false
    },
    professionalSettings: {
      clientBranding: true,
      multiLanguage: false,
      qualityTiers: ['Professional', 'Premium'],
      analytics: true,
      customization: true
    }
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'generating': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'premium': return 'text-purple-600 bg-purple-100';
      case 'professional': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-orange-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Publishing Platform</h2>
              <p className="text-sm text-gray-600">Semantic media generation for wellness professionals</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              AURELIA Integration Active
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate All Media'}
            </Button>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Semantic Analysis & Media Generation...</span>
              <span className="text-sm text-gray-600">{Math.round(generationProgress)}%</span>
            </div>
            <Progress value={generationProgress} className="h-2 mb-2" />
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Mic className="w-3 h-3 text-blue-600" />
                <span>Voice synthesis</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="w-3 h-3 text-green-600" />
                <span>Music composition</span>
              </div>
              <div className="flex items-center gap-1">
                <Image className="w-3 h-3 text-purple-600" />
                <span>Visual generation</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="w-3 h-3 text-orange-600" />
                <span>Video creation</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="h-full flex flex-col">
          <div className="border-b border-gray-200 px-6 pt-4">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="create">Create Media</TabsTrigger>
              <TabsTrigger value="preview">Preview & Edit</TabsTrigger>
              <TabsTrigger value="export">Export & Publish</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="create" className="flex-1 overflow-hidden mt-0">
            <div className="h-full flex">
              {/* Script & Context Panel */}
              <div className="w-1/3 border-r border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Wellness Script</h3>
                    <Textarea
                      placeholder="Enter your wellness script content..."
                      value={scriptContent || sampleScript}
                      onChange={(e) => setScriptContent(e.target.value)}
                      className="h-32 text-sm"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Semantic Analysis</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">Extracted Concepts</h4>
                        <div className="flex flex-wrap gap-1">
                          {['gentle guidance', 'flowing energy', 'crown chakra', 'tension release', 'clarity', 'grounding'].map((concept) => (
                            <Badge key={concept} variant="outline" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="text-sm font-medium text-green-900 mb-2">Emotional Tone</h4>
                        <p className="text-sm text-green-700">Nurturing, peaceful, grounding, transformative</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="text-sm font-medium text-purple-900 mb-2">AURELIA Elements</h4>
                        <div className="text-xs space-y-1">
                          <div>• Crown Chakra (Spiritual Foundation)</div>
                          <div>• Energy Flow Visualization (Technique)</div>
                          <div>• Grounding Practice (Method)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Professional Context</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Audience:</span>
                        <span>Stress relief seekers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Session Duration:</span>
                        <span>8-12 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty Level:</span>
                        <span>Beginner-friendly</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best Use Cases:</span>
                        <span>Evening sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Generation Panel */}
              <div className="flex-1">
                <ScrollArea className="h-full p-6">
                  <div className="space-y-4">
                    {/* Voice Generation Section */}
                    <Card>
                      <CardHeader>
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleSection('voice')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Mic className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Voice Generation</CardTitle>
                              <p className="text-sm text-gray-600">AI voices based on script emotional context</p>
                            </div>
                          </div>
                          {expandedSections.includes('voice') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </CardHeader>
                      
                      {expandedSections.includes('voice') && (
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h4 className="text-sm font-medium text-blue-900 mb-2">Semantic Voice Matching</h4>
                              <p className="text-xs text-blue-700 mb-3">
                                AI analyzes emotional tone, pacing, and AURELIA elements to select optimal voice characteristics
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="font-medium">Tone:</span> Nurturing
                                </div>
                                <div>
                                  <span className="font-medium">Pace:</span> Gentle flow
                                </div>
                                <div>
                                  <span className="font-medium">Energy:</span> Calming
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-3">
                              {generatedAssets.filter(asset => asset.type === 'voice').map((asset) => (
                                <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <h4 className="font-medium">{asset.name}</h4>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge className={`text-xs ${getStatusColor(asset.status)}`}>
                                          {asset.status}
                                        </Badge>
                                        <Badge className={`text-xs ${getQualityColor(asset.metadata.quality)}`}>
                                          {asset.metadata.quality}
                                        </Badge>
                                      </div>
                                    </div>
                                    {asset.status === 'ready' && (
                                      <div className="flex gap-2">
                                        <Button variant="ghost" size="sm">
                                          <Play className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                          <Download className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>

                                  {asset.status === 'generating' && (
                                    <div className="mb-3">
                                      <Progress value={asset.progress} className="h-2" />
                                      <p className="text-xs text-gray-500 mt-1">{asset.progress}% complete</p>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <span className="text-gray-600">AURELIA Alignment:</span> {asset.metadata.aureliaAlignment}%
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Emotional Resonance:</span> {asset.metadata.emotionalResonance}%
                                    </div>
                                  </div>

                                  <div className="mt-3">
                                    <h5 className="text-xs font-medium mb-1">Professional Features:</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {asset.professionalFeatures.qualityVariants.map((variant) => (
                                        <Badge key={variant} variant="outline" className="text-xs">
                                          {variant}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Button variant="outline" className="w-full">
                              <Wand2 className="w-4 h-4 mr-2" />
                              Generate Additional Voice Variants
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Music Generation Section */}
                    <Card>
                      <CardHeader>
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleSection('music')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <Music className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Music Composition</CardTitle>
                              <p className="text-sm text-gray-600">Contextual soundscapes for wellness journey</p>
                            </div>
                          </div>
                          {expandedSections.includes('music') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </CardHeader>
                      
                      {expandedSections.includes('music') && (
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h4 className="text-sm font-medium text-green-900 mb-2">Compose the perfect soundscape for your wellness journey</h4>
                              <p className="text-xs text-green-700 mb-3">
                                AI creates music that follows the emotional arc of your script, with chakra-specific frequencies and nature sounds
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="font-medium">Frequency:</span> 432Hz
                                </div>
                                <div>
                                  <span className="font-medium">Style:</span> Ambient flow
                                </div>
                                <div>
                                  <span className="font-medium">Elements:</span> Water, Crystal
                                </div>
                              </div>
                            </div>

                            {generatedAssets.filter(asset => asset.type === 'music').map((asset) => (
                              <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h4 className="font-medium">{asset.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge className={`text-xs ${getStatusColor(asset.status)}`}>
                                        {asset.status}
                                      </Badge>
                                      <Badge className={`text-xs ${getQualityColor(asset.metadata.quality)}`}>
                                        {asset.metadata.quality}
                                      </Badge>
                                    </div>
                                  </div>
                                  {asset.status === 'ready' && (
                                    <div className="flex gap-2">
                                      <Button variant="ghost" size="sm">
                                        <Play className="w-4 h-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Edit3 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>

                                {asset.status === 'generating' && (
                                  <div className="mb-3">
                                    <Progress value={asset.progress} className="h-2" />
                                    <p className="text-xs text-gray-500 mt-1">Composing based on semantic analysis...</p>
                                  </div>
                                )}

                                <div className="text-xs space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Duration:</span> {asset.metadata.duration}
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">AURELIA Alignment:</span> {asset.metadata.aureliaAlignment}%
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className="grid grid-cols-3 gap-2">
                              <Button variant="outline" size="sm">
                                <Headphones className="w-4 h-4 mr-2" />
                                Preview Mix
                              </Button>
                              <Button variant="outline" size="sm">
                                <Palette className="w-4 h-4 mr-2" />
                                Adjust Mood
                              </Button>
                              <Button variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Regenerate
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Visual Generation Section */}
                    <Card>
                      <CardHeader>
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleSection('images')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Image className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Visual Content</CardTitle>
                              <p className="text-sm text-gray-600">Images and graphics aligned with meditation themes</p>
                            </div>
                          </div>
                          {expandedSections.includes('images') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </CardHeader>
                      
                      {expandedSections.includes('images') && (
                        <CardContent>
                          <div className="space-y-4">
                            {generatedAssets.filter(asset => asset.type === 'image').map((asset) => (
                              <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex gap-4">
                                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                    {asset.url && (
                                      <img 
                                        src={asset.url} 
                                        alt={asset.name}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{asset.name}</h4>
                                    <div className="flex items-center gap-2 mt-1 mb-2">
                                      <Badge className={`text-xs ${getStatusColor(asset.status)}`}>
                                        {asset.status}
                                      </Badge>
                                      <Badge className={`text-xs ${getQualityColor(asset.metadata.quality)}`}>
                                        {asset.metadata.quality}
                                      </Badge>
                                    </div>
                                    <div className="text-xs space-y-1">
                                      <div>Semantic Context: {asset.metadata.semanticContext.join(', ')}</div>
                                      <div>AURELIA Alignment: {asset.metadata.aureliaAlignment}%</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Video Generation Section */}
                    <Card>
                      <CardHeader>
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleSection('videos')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Video className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Video Creation</CardTitle>
                              <p className="text-sm text-gray-600">Dynamic visual experiences with synchronized audio</p>
                            </div>
                          </div>
                          {expandedSections.includes('videos') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </CardHeader>
                      
                      {expandedSections.includes('videos') && (
                        <CardContent>
                          <div className="space-y-4">
                            {generatedAssets.filter(asset => asset.type === 'video').map((asset) => (
                              <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h4 className="font-medium">{asset.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge className={`text-xs ${getStatusColor(asset.status)}`}>
                                        {asset.status}
                                      </Badge>
                                      <Badge className={`text-xs ${getQualityColor(asset.metadata.quality)}`}>
                                        {asset.metadata.quality}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {asset.status === 'generating' && (
                                  <div className="mb-3">
                                    <Progress value={asset.progress} className="h-2" />
                                    <p className="text-xs text-gray-500 mt-1">Creating video with synchronized energy flow...</p>
                                  </div>
                                )}

                                <div className="text-xs space-y-1">
                                  <div>Duration: {asset.metadata.duration}</div>
                                  <div>Semantic Context: {asset.metadata.semanticContext.join(', ')}</div>
                                  <div>Platform Optimization: {asset.professionalFeatures.platformOptimization.join(', ')}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-hidden mt-0">
            <div className="h-full p-6">
              <div className="grid grid-cols-2 gap-6 h-full">
                {/* Preview Player */}
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Media Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-full">
                      <div className="bg-black rounded-lg aspect-video mb-4 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={figmaImage1} 
                          alt="Spine visualization preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{publishConfig.title}</h3>
                          <Badge variant="secondary">Professional Quality</Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600">{publishConfig.description}</p>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm">
                            <Volume2 className="w-4 h-4 mr-2" />
                            Audio Only
                          </Button>
                          <Button variant="outline" size="sm">
                            <Monitor className="w-4 h-4 mr-2" />
                            Full Screen
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="w-4 h-4 mr-2" />
                            Share Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Edit Controls */}
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Edit & Customize</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-full">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">Campaign Details</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input 
                                  value={publishConfig.title}
                                  onChange={(e) => setPublishConfig(prev => ({ ...prev, title: e.target.value }))}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <Textarea 
                                  value={publishConfig.description}
                                  onChange={(e) => setPublishConfig(prev => ({ ...prev, description: e.target.value }))}
                                  className="h-20"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Professional Settings</h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Client Branding</span>
                                <Switch 
                                  checked={publishConfig.professionalSettings.clientBranding}
                                  onCheckedChange={(checked) => 
                                    setPublishConfig(prev => ({
                                      ...prev,
                                      professionalSettings: { ...prev.professionalSettings, clientBranding: checked }
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Multi-language Support</span>
                                <Switch 
                                  checked={publishConfig.professionalSettings.multiLanguage}
                                  onCheckedChange={(checked) => 
                                    setPublishConfig(prev => ({
                                      ...prev,
                                      professionalSettings: { ...prev.professionalSettings, multiLanguage: checked }
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Analytics Tracking</span>
                                <Switch 
                                  checked={publishConfig.professionalSettings.analytics}
                                  onCheckedChange={(checked) => 
                                    setPublishConfig(prev => ({
                                      ...prev,
                                      professionalSettings: { ...prev.professionalSettings, analytics: checked }
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Client Customization</span>
                                <Switch 
                                  checked={publishConfig.professionalSettings.customization}
                                  onCheckedChange={(checked) => 
                                    setPublishConfig(prev => ({
                                      ...prev,
                                      professionalSettings: { ...prev.professionalSettings, customization: checked }
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Quality Tiers</h4>
                            <div className="space-y-2">
                              {['Draft', 'Professional', 'Premium'].map((tier) => (
                                <div key={tier} className="flex items-center justify-between p-2 border rounded">
                                  <span className="text-sm">{tier}</span>
                                  <Switch 
                                    checked={publishConfig.professionalSettings.qualityTiers.includes(tier)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setPublishConfig(prev => ({
                                          ...prev,
                                          professionalSettings: {
                                            ...prev.professionalSettings,
                                            qualityTiers: [...prev.professionalSettings.qualityTiers, tier]
                                          }
                                        }));
                                      } else {
                                        setPublishConfig(prev => ({
                                          ...prev,
                                          professionalSettings: {
                                            ...prev.professionalSettings,
                                            qualityTiers: prev.professionalSettings.qualityTiers.filter(t => t !== tier)
                                          }
                                        }));
                                      }
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="flex-1 overflow-hidden mt-0">
            <div className="h-full p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Export & Publish Your Wellness Campaign</h3>
                  <Button className="bg-gradient-to-r from-pink-600 to-orange-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Publish Campaign
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Export Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Export Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(publishConfig.exportFormats).map(([format, enabled]) => (
                          <div key={format} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {format === 'text' && <FileText className="w-4 h-4" />}
                              {format === 'voice' && <Mic className="w-4 h-4" />}
                              {format === 'music' && <Music className="w-4 h-4" />}
                              {format === 'images' && <Image className="w-4 h-4" />}
                              {format === 'videos' && <Video className="w-4 h-4" />}
                              {format === 'interactive' && <Monitor className="w-4 h-4" />}
                              <span className="text-sm capitalize">{format}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {enabled && <Check className="w-4 h-4 text-green-600" />}
                              <Switch 
                                checked={enabled}
                                onCheckedChange={(checked) => 
                                  setPublishConfig(prev => ({
                                    ...prev,
                                    exportFormats: { ...prev.exportFormats, [format]: checked }
                                  }))
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Platform Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Platform Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'Wellness Apps', icon: Smartphone, optimized: true },
                          { name: 'Professional Practice', icon: Heart, optimized: true },
                          { name: 'Online Courses', icon: Monitor, optimized: true },
                          { name: 'YouTube/Social', icon: Video, optimized: false },
                          { name: 'Podcast Platforms', icon: Headphones, optimized: false },
                          { name: 'Healthcare Systems', icon: Target, optimized: true }
                        ].map((platform) => (
                          <div key={platform.name} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <platform.icon className="w-4 h-4" />
                              <span className="text-sm">{platform.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {platform.optimized && (
                                <Badge variant="secondary" className="text-xs">Optimized</Badge>
                              )}
                              <Switch />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Professional Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Professional Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 mb-2">Client Portal Access</h4>
                          <p className="text-xs text-blue-700 mb-2">Secure sharing with personalized branding</p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Users className="w-4 h-4 mr-2" />
                            Setup Client Portal
                          </Button>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="text-sm font-medium text-green-900 mb-2">Analytics Dashboard</h4>
                          <p className="text-xs text-green-700 mb-2">Track usage, engagement, and outcomes</p>
                          <Button variant="outline" size="sm" className="w-full">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Enable Analytics
                          </Button>
                        </div>

                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h4 className="text-sm font-medium text-purple-900 mb-2">Custom Branding</h4>
                          <p className="text-xs text-purple-700 mb-2">Your logo, colors, and messaging</p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Palette className="w-4 h-4 mr-2" />
                            Customize Brand
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Export Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Export Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-medium text-blue-600">5</div>
                        <div className="text-xs text-gray-600">Media Assets</div>
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-green-600">324MB</div>
                        <div className="text-xs text-gray-600">Total Size</div>
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-purple-600">6</div>
                        <div className="text-xs text-gray-600">Platforms</div>
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-orange-600">94%</div>
                        <div className="text-xs text-gray-600">Quality Score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 overflow-hidden mt-0">
            <div className="h-full p-6">
              <div className="space-y-6">
                <h3 className="font-medium">Campaign Performance Analytics</h3>
                
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-medium text-blue-600">87%</div>
                      <div className="text-xs text-gray-600">Engagement Rate</div>
                      <div className="text-xs text-green-600 mt-1">↑ 12% vs baseline</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-medium text-green-600">4.8</div>
                      <div className="text-xs text-gray-600">Client Satisfaction</div>
                      <div className="text-xs text-green-600 mt-1">↑ 0.3 vs last month</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-medium text-purple-600">92%</div>
                      <div className="text-xs text-gray-600">Completion Rate</div>
                      <div className="text-xs text-green-600 mt-1">↑ 8% vs average</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-medium text-orange-600">156</div>
                      <div className="text-xs text-gray-600">Active Users</div>
                      <div className="text-xs text-green-600 mt-1">↑ 23% growth</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AURELIA System Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-medium text-green-600">96%</div>
                          <div className="text-xs text-gray-600">Developmental Hierarchy Alignment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium text-blue-600">91%</div>
                          <div className="text-xs text-gray-600">Wellness Framework Integration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium text-purple-600">89%</div>
                          <div className="text-xs text-gray-600">Aesthetic Experience Quality</div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="text-sm font-medium text-green-900 mb-2">Semantic Intelligence Impact</h4>
                        <p className="text-xs text-green-700">
                          AI-generated content shows 23% higher engagement than template-based alternatives, 
                          with 18% better emotional resonance scores from client feedback.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublishingPlatform;