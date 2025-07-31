import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  Image, 
  Music, 
  Video,
  FileText,
  Package,
  Wand2,
  Settings,
  Eye,
  Share,
  Cloud,
  Sparkles,
  Palette,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MediaAsset {
  id: string;
  type: 'voice' | 'music' | 'visual' | 'video' | 'interactive';
  name: string;
  description: string;
  status: 'generating' | 'ready' | 'error';
  progress: number;
  duration?: string;
  fileSize?: string;
  format: string;
  quality: 'low' | 'medium' | 'high' | 'premium';
  previewUrl?: string;
  downloadUrl?: string;
}

interface MediaPack {
  id: string;
  name: string;
  description: string;
  assets: MediaAsset[];
  totalSize: string;
  estimatedTime: string;
  platforms: string[];
  status: 'pending' | 'generating' | 'ready' | 'error';
  progress: number;
}

const MultimodalOutputManager: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string>('complete');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Sample media assets
  const mediaAssets: MediaAsset[] = [
    {
      id: 'voice1',
      type: 'voice',
      name: 'Wellness Script - Soothing Female Voice',
      description: 'AI-generated voice with calming, nurturing tone',
      status: 'ready',
      progress: 100,
      duration: '12:34',
      fileSize: '23.4 MB',
      format: 'MP3 (320kbps)',
      quality: 'premium',
      previewUrl: '/sample-audio.mp3'
    },
    {
      id: 'voice2',
      type: 'voice',
      name: 'Wellness Script - Deep Male Voice',
      description: 'AI-generated voice with grounding, wise tone',
      status: 'ready',
      progress: 100,
      duration: '12:34',
      fileSize: '23.4 MB',
      format: 'MP3 (320kbps)',
      quality: 'premium'
    },
    {
      id: 'music1',
      type: 'music',
      name: 'Forest Ambient Background',
      description: 'Nature sounds with subtle harmonic drones',
      status: 'ready',
      progress: 100,
      duration: '15:00',
      fileSize: '34.2 MB',
      format: 'WAV (48kHz)',
      quality: 'high'
    },
    {
      id: 'music2',
      type: 'music',
      name: 'Chakra Healing Frequencies',
      description: 'Binaural beats at 432Hz for root chakra',
      status: 'generating',
      progress: 67,
      duration: '15:00',
      fileSize: '34.2 MB',
      format: 'WAV (48kHz)',
      quality: 'high'
    },
    {
      id: 'visual1',
      type: 'visual',
      name: 'Meditation Background Slideshow',
      description: 'Calming nature visuals synchronized with script',
      status: 'ready',
      progress: 100,
      duration: '12:34',
      fileSize: '156.7 MB',
      format: 'MP4 (1080p)',
      quality: 'high'
    },
    {
      id: 'visual2',
      type: 'visual',
      name: 'Chakra Visualization Graphics',
      description: 'Animated chakra symbols and energy flows',
      status: 'generating',
      progress: 45,
      duration: '12:34',
      fileSize: '89.3 MB',
      format: 'MP4 (1080p)',
      quality: 'medium'
    },
    {
      id: 'interactive1',
      type: 'interactive',
      name: 'Web-based Meditation Player',
      description: 'Interactive player with progress tracking',
      status: 'ready',
      progress: 100,
      fileSize: '2.1 MB',
      format: 'HTML/JS',
      quality: 'high'
    }
  ];

  // Predefined media packs
  const mediaPacks: MediaPack[] = [
    {
      id: 'complete',
      name: 'Complete Media Campaign',
      description: 'Full multimedia package with all assets optimized for multiple platforms',
      assets: mediaAssets,
      totalSize: '324.1 MB',
      estimatedTime: '8-12 minutes',
      platforms: ['Web', 'Mobile App', 'Desktop', 'Smart TV', 'Audio Only'],
      status: 'ready',
      progress: 85
    },
    {
      id: 'audio-only',
      name: 'Audio-Focused Package',
      description: 'Voice narration with background music for podcast/audio platforms',
      assets: mediaAssets.filter(a => a.type === 'voice' || a.type === 'music'),
      totalSize: '91.2 MB',
      estimatedTime: '3-5 minutes',
      platforms: ['Spotify', 'Podcast', 'Audio Apps'],
      status: 'ready',
      progress: 100
    },
    {
      id: 'visual-experience',
      name: 'Visual Experience Package',
      description: 'Full visual meditation with synchronized audio',
      assets: mediaAssets.filter(a => a.type === 'voice' || a.type === 'visual' || a.type === 'music'),
      totalSize: '264.8 MB',
      estimatedTime: '6-8 minutes',
      platforms: ['YouTube', 'Apps', 'Web', 'Smart TV'],
      status: 'generating',
      progress: 72
    },
    {
      id: 'mobile-optimized',
      name: 'Mobile-Optimized Package',
      description: 'Compressed assets optimized for mobile delivery',
      assets: mediaAssets.map(a => ({ ...a, quality: 'medium' as const, fileSize: `${Math.round(parseFloat(a.fileSize?.split(' ')[0] || '0') * 0.6)} MB` })),
      totalSize: '156.3 MB',
      estimatedTime: '4-6 minutes',
      platforms: ['iOS App', 'Android App', 'Mobile Web'],
      status: 'pending',
      progress: 0
    }
  ];

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'voice': return Mic;
      case 'music': return Music;
      case 'visual': return Image;
      case 'video': return Video;
      case 'interactive': return Monitor;
      default: return FileText;
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'high': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600';
      case 'generating': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleGenerateAll = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const selectedPackData = mediaPacks.find(p => p.id === selectedPack);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Multimodal Output Manager</h2>
              <p className="text-sm text-gray-600">Generate complete media campaigns with one click</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button 
              onClick={handleGenerateAll}
              disabled={isGenerating}
              className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700"
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
            className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Generating Media Assets...</span>
              <span className="text-sm text-gray-600">{Math.round(generationProgress)}%</span>
            </div>
            <Progress value={generationProgress} className="h-2" />
            <p className="text-xs text-gray-600 mt-2">
              Creating voice narration, background music, and visual elements...
            </p>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Media Pack Selection */}
          <div className="w-80 border-r border-gray-200 p-4">
            <h3 className="font-medium mb-4">Media Packages</h3>
            <div className="space-y-3">
              {mediaPacks.map((pack) => (
                <Card
                  key={pack.id}
                  className={`cursor-pointer transition-all ${
                    selectedPack === pack.id 
                      ? 'border-orange-300 bg-orange-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPack(pack.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{pack.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(pack.status)}`}>
                        {pack.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{pack.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Size:</span>
                        <span>{pack.totalSize}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Assets:</span>
                        <span>{pack.assets.length} files</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Generation:</span>
                        <span>{pack.estimatedTime}</span>
                      </div>
                    </div>

                    {pack.status === 'generating' && (
                      <div className="mt-3">
                        <Progress value={pack.progress} className="h-1" />
                        <p className="text-xs text-gray-500 mt-1">{pack.progress}% complete</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mt-3">
                      {pack.platforms.slice(0, 3).map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                      {pack.platforms.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pack.platforms.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Asset Details */}
          <div className="flex-1">
            <Tabs defaultValue="assets" className="h-full flex flex-col">
              <div className="border-b border-gray-200 px-6 pt-4">
                <TabsList className="grid w-full grid-cols-4 max-w-md">
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="platforms">Platforms</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="assets" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full p-6">
                  {selectedPackData && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{selectedPackData.name}</h3>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download All
                        </Button>
                      </div>

                      <div className="grid gap-4">
                        {selectedPackData.assets.map((asset) => {
                          const IconComponent = getAssetIcon(asset.type);
                          return (
                            <Card key={asset.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-gray-600" />
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-medium">{asset.name}</h4>
                                      <div className="flex items-center gap-2">
                                        <Badge className={`text-xs ${getQualityColor(asset.quality)}`}>
                                          {asset.quality}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                          {asset.format}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-3">{asset.description}</p>
                                    
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <div className="flex gap-4">
                                        {asset.duration && <span>Duration: {asset.duration}</span>}
                                        <span>Size: {asset.fileSize}</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        {asset.status === 'generating' && (
                                          <div className="flex items-center gap-2">
                                            <Progress value={asset.progress} className="h-1 w-20" />
                                            <span>{asset.progress}%</span>
                                          </div>
                                        )}
                                        
                                        {asset.status === 'ready' && (
                                          <div className="flex gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                              <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                              <Play className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                              <Download className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="preview" className="flex-1 overflow-hidden mt-0">
                <div className="h-full p-6">
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Media Preview</p>
                      <p className="text-sm opacity-75">Click play to preview your media campaign</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Audio Only
                    </Button>
                    <Button>
                      <Play className="w-4 h-4 mr-2" />
                      Play Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Monitor className="w-4 h-4 mr-2" />
                      Full Screen
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="flex-1 overflow-hidden mt-0">
                <ScrollArea className="h-full p-6">
                  <div className="space-y-6">
                    <h3 className="font-medium">Platform Optimization</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="p-4 text-center">
                        <Monitor className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                        <h4 className="font-medium mb-2">Desktop/Web</h4>
                        <p className="text-xs text-gray-600 mb-3">High-quality video and audio for desktop experiences</p>
                        <Badge variant="secondary" className="text-xs">1080p • 320kbps</Badge>
                      </Card>
                      
                      <Card className="p-4 text-center">
                        <Smartphone className="w-8 h-8 mx-auto mb-3 text-green-600" />
                        <h4 className="font-medium mb-2">Mobile Apps</h4>
                        <p className="text-xs text-gray-600 mb-3">Optimized for mobile data and battery</p>
                        <Badge variant="secondary" className="text-xs">720p • 192kbps</Badge>
                      </Card>
                      
                      <Card className="p-4 text-center">
                        <Headphones className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                        <h4 className="font-medium mb-2">Audio Platforms</h4>
                        <p className="text-xs text-gray-600 mb-3">Podcast and streaming-ready audio</p>
                        <Badge variant="secondary" className="text-xs">Audio Only • 320kbps</Badge>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Platform-Specific Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <Video className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h5 className="font-medium">YouTube Integration</h5>
                              <p className="text-xs text-gray-600">Automatic chapters, closed captions, and thumbnail generation</p>
                            </div>
                            <Badge variant="secondary">Ready</Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                              <Smartphone className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h5 className="font-medium">App Store Assets</h5>
                              <p className="text-xs text-gray-600">Screenshots, preview videos, and metadata for app stores</p>
                            </div>
                            <Badge variant="secondary">Ready</Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                              <Music className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h5 className="font-medium">Podcast Distribution</h5>
                              <p className="text-xs text-gray-600">RSS feed, episode artwork, and metadata for podcast platforms</p>
                            </div>
                            <Badge variant="secondary">Ready</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="export" className="flex-1 overflow-hidden mt-0">
                <div className="h-full p-6">
                  <div className="space-y-6">
                    <h3 className="font-medium">Export & Distribution</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Download Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full" variant="outline">
                            <Package className="w-4 h-4 mr-2" />
                            Download Complete Package (324MB)
                          </Button>
                          <Button className="w-full" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Audio-Only Package (91MB)
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Image className="w-4 h-4 mr-2" />
                            Visual Assets Only (156MB)
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Monitor className="w-4 h-4 mr-2" />
                            Interactive Player (2MB)
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Cloud className="w-5 h-5" />
                            Cloud Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full">
                            <Share className="w-4 h-4 mr-2" />
                            Upload to Cloud Storage
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Publish to YouTube
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Music className="w-4 h-4 mr-2" />
                            Submit to Podcast Platforms
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Smartphone className="w-4 h-4 mr-2" />
                            Deploy to App Stores
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Distribution Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-medium text-blue-600">247</div>
                            <div className="text-xs text-gray-600">Total Downloads</div>
                          </div>
                          <div>
                            <div className="text-2xl font-medium text-green-600">89%</div>
                            <div className="text-xs text-gray-600">Completion Rate</div>
                          </div>
                          <div>
                            <div className="text-2xl font-medium text-purple-600">4.8</div>
                            <div className="text-xs text-gray-600">Avg Rating</div>
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
      </div>
    </div>
  );
};

export default MultimodalOutputManager;