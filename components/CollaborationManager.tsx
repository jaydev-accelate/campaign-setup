import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { 
  Users, 
  GitBranch, 
  History, 
  MessageCircle, 
  Share, 
  Lock,
  Unlock,
  Edit3,
  Eye,
  Clock,
  Star,
  User,
  UserPlus,
  Settings,
  Activity,
  Zap,
  Copy,
  Download,
  PlayCircle,
  PauseCircle,
  MoreHorizontal,
  Award,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer' | 'ai-agent';
  status: 'online' | 'offline' | 'away';
  lastActive: Date;
  currentSection?: string;
  contribution: number; // percentage of current script
  reputation: number;
}

interface ScriptVersion {
  id: string;
  version: string;
  author: string;
  authorAvatar: string;
  timestamp: Date;
  changes: string[];
  message: string;
  parentVersion?: string;
  isActive: boolean;
  stats: {
    additions: number;
    deletions: number;
    modifications: number;
  };
}

interface RemixLineage {
  id: string;
  originalScript: string;
  originalAuthor: string;
  remixAuthor: string;
  remixTitle: string;
  remixDate: Date;
  changes: string[];
  attribution: string;
  popularity: number;
  rating: number;
}

interface LiveCursor {
  userId: string;
  userName: string;
  userColor: string;
  position: { x: number; y: number };
  section: string;
  action: 'editing' | 'selecting' | 'idle';
}

const CollaborationManager: React.FC = () => {
  const [activeView, setActiveView] = useState<'collaborators' | 'versions' | 'remixes' | 'live'>('live');
  const [liveCursors, setLiveCursors] = useState<LiveCursor[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // Sample collaborators
  const collaborators: Collaborator[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'owner',
      status: 'online',
      lastActive: new Date(),
      currentSection: 'Breathing Techniques',
      contribution: 45,
      reputation: 98
    },
    {
      id: '2',
      name: 'Marcus Thompson',
      avatar: '/avatars/marcus.jpg',
      role: 'editor',
      status: 'online',
      lastActive: new Date(Date.now() - 5 * 60000),
      currentSection: 'Chakra Visualization',
      contribution: 30,
      reputation: 87
    },
    {
      id: '3',
      name: 'Aurelia AI Assistant',
      avatar: '/avatars/ai.jpg',
      role: 'ai-agent',
      status: 'online',
      lastActive: new Date(),
      currentSection: 'Language Optimization',
      contribution: 25,
      reputation: 95
    },
    {
      id: '4',
      name: 'Elena Rodriguez',
      avatar: '/avatars/elena.jpg',
      role: 'viewer',
      status: 'away',
      lastActive: new Date(Date.now() - 20 * 60000),
      contribution: 0,
      reputation: 76
    }
  ];

  // Sample version history
  const versions: ScriptVersion[] = [
    {
      id: 'v1.3',
      version: '1.3',
      author: 'Dr. Sarah Chen',
      authorAvatar: '/avatars/sarah.jpg',
      timestamp: new Date(),
      changes: ['Added nature imagery to opening', 'Extended breathing section', 'Improved transition flow'],
      message: 'Enhanced opening sequence based on client feedback',
      isActive: true,
      stats: { additions: 34, deletions: 8, modifications: 12 }
    },
    {
      id: 'v1.2',
      version: '1.2',
      author: 'Marcus Thompson',
      authorAvatar: '/avatars/marcus.jpg',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      changes: ['Refined chakra visualization', 'Added grounding techniques'],
      message: 'Incorporated advanced visualization methods',
      parentVersion: 'v1.1',
      isActive: false,
      stats: { additions: 28, deletions: 5, modifications: 15 }
    },
    {
      id: 'v1.1',
      version: '1.1',
      author: 'Aurelia AI Assistant',
      authorAvatar: '/avatars/ai.jpg',
      timestamp: new Date(Date.now() - 4 * 60 * 60000),
      changes: ['Optimized language patterns', 'Improved pacing', 'Enhanced emotional resonance'],
      message: 'AI optimization for better engagement metrics',
      parentVersion: 'v1.0',
      isActive: false,
      stats: { additions: 15, deletions: 22, modifications: 31 }
    }
  ];

  // Sample remix lineage
  const remixLineage: RemixLineage[] = [
    {
      id: 'r1',
      originalScript: 'Root Chakra Grounding',
      originalAuthor: 'Dr. Sarah Chen',
      remixAuthor: 'Wellness Studio Pro',
      remixTitle: 'Corporate Stress Relief (Root Chakra)',
      remixDate: new Date(Date.now() - 1 * 24 * 60 * 60000),
      changes: ['Adapted for workplace environment', 'Shortened to 10 minutes', 'Added productivity focus'],
      attribution: 'Based on "Root Chakra Grounding" by Dr. Sarah Chen',
      popularity: 87,
      rating: 4.6
    },
    {
      id: 'r2',
      originalScript: 'Root Chakra Grounding',
      originalAuthor: 'Dr. Sarah Chen',
      remixAuthor: 'MindfulTeens',
      remixTitle: 'Teen Anxiety Relief - Root Chakra',
      remixDate: new Date(Date.now() - 3 * 24 * 60 * 60000),
      changes: ['Adapted language for teenagers', 'Added social anxiety focus', 'Included school-specific scenarios'],
      attribution: 'Adapted from "Root Chakra Grounding" by Dr. Sarah Chen',
      popularity: 134,
      rating: 4.8
    },
    {
      id: 'r3',
      originalScript: 'Root Chakra Grounding',
      originalAuthor: 'Dr. Sarah Chen',
      remixAuthor: 'SleepWell Audio',
      remixTitle: 'Bedtime Grounding Meditation',
      remixDate: new Date(Date.now() - 7 * 24 * 60 * 60000),
      changes: ['Slowed down pacing', 'Added sleep transition', 'Extended relaxation phase'],
      attribution: 'Inspired by "Root Chakra Grounding" by Dr. Sarah Chen',
      popularity: 203,
      rating: 4.9
    }
  ];

  // Simulate live cursors
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCursors([
        {
          userId: '1',
          userName: 'Sarah',
          userColor: '#3B82F6',
          position: { x: Math.random() * 800, y: Math.random() * 600 },
          section: 'Opening Sequence',
          action: 'editing'
        },
        {
          userId: '2',
          userName: 'Marcus',
          userColor: '#10B981',
          position: { x: Math.random() * 800, y: Math.random() * 600 },
          section: 'Chakra Section',
          action: 'selecting'
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Award className="w-3 h-3 text-yellow-600" />;
      case 'editor': return <Edit3 className="w-3 h-3 text-blue-600" />;
      case 'viewer': return <Eye className="w-3 h-3 text-gray-600" />;
      case 'ai-agent': return <Zap className="w-3 h-3 text-purple-600" />;
      default: return <User className="w-3 h-3 text-gray-600" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Collaboration Hub</h2>
              <p className="text-sm text-gray-600">Real-time co-authoring, version control & remix tracking</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {collaborators.filter(c => c.status === 'online').map((user) => (
                <div key={user.id} className="relative">
                  <Avatar className="w-8 h-8 border-2 border-white">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
            <Button 
              variant={isRecording ? 'destructive' : 'default'}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <>
                  <PauseCircle className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Session
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 mt-4 bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeView === 'live' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('live')}
            className="flex-1 text-xs"
          >
            <Activity className="w-4 h-4 mr-2" />
            Live Session
          </Button>
          <Button
            variant={activeView === 'collaborators' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('collaborators')}
            className="flex-1 text-xs"
          >
            <Users className="w-4 h-4 mr-2" />
            Team
          </Button>
          <Button
            variant={activeView === 'versions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('versions')}
            className="flex-1 text-xs"
          >
            <History className="w-4 h-4 mr-2" />
            Versions
          </Button>
          <Button
            variant={activeView === 'remixes' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('remixes')}
            className="flex-1 text-xs"
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Remixes
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'live' && (
          <div className="h-full p-6">
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Live Editing Canvas */}
              <div className="col-span-2 relative">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Edit3 className="w-5 h-5" />
                      Live Script Editor
                      {isRecording && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          RECORDING
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full relative overflow-hidden">
                    {/* Live Cursors */}
                    <AnimatePresence>
                      {liveCursors.map((cursor) => (
                        <motion.div
                          key={cursor.userId}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            x: cursor.position.x,
                            y: cursor.position.y
                          }}
                          exit={{ opacity: 0 }}
                          className="absolute pointer-events-none z-10"
                          style={{ color: cursor.userColor }}
                        >
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-4 h-4 rounded-full border-2 border-white"
                              style={{ backgroundColor: cursor.userColor }}
                            ></div>
                            <div 
                              className="px-2 py-1 rounded text-xs text-white font-medium"
                              style={{ backgroundColor: cursor.userColor }}
                            >
                              {cursor.userName} - {cursor.section}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Script Content */}
                    <div className="space-y-4 pr-4">
                      <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">1. Opening Sequence</h4>
                        <p className="text-sm text-gray-700">
                          Welcome, dear soul, to this sacred space of healing and transformation...
                        </p>
                        <div className="text-xs text-blue-600 mt-2">
                          Currently editing: Sarah Chen
                        </div>
                      </div>
                      
                      <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <h4 className="font-medium mb-2">2. Grounding Techniques</h4>
                        <p className="text-sm text-gray-700">
                          Let us begin by connecting with the earth beneath you...
                        </p>
                        <div className="text-xs text-green-600 mt-2">
                          Currently editing: Marcus Thompson
                        </div>
                      </div>
                      
                      <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                        <h4 className="font-medium mb-2">3. Chakra Visualization</h4>
                        <p className="text-sm text-gray-700">
                          Now we turn our attention to the base of your spine...
                        </p>
                        <div className="text-xs text-purple-600 mt-2">
                          AI optimizing language patterns
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Activity Feed */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Live Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-full">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/avatars/sarah.jpg" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">Sarah added nature imagery to opening</p>
                            <p className="text-xs text-gray-500">2 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/avatars/ai.jpg" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">AI optimized breathing rhythm timing</p>
                            <p className="text-xs text-gray-500">5 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/avatars/marcus.jpg" />
                            <AvatarFallback>MT</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">Marcus refined chakra visualization section</p>
                            <p className="text-xs text-gray-500">8 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="/avatars/elena.jpg" />
                            <AvatarFallback>ER</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">Elena left feedback on transition timing</p>
                            <p className="text-xs text-gray-500">12 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeView === 'collaborators' && (
          <ScrollArea className="h-full p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Team Members</h3>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Permissions
                </Button>
              </div>

              <div className="grid gap-4">
                {collaborators.map((collaborator) => (
                  <Card key={collaborator.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={collaborator.avatar} />
                            <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`}></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{collaborator.name}</h4>
                            {getRoleIcon(collaborator.role)}
                            <Badge variant="outline" className="text-xs capitalize">
                              {collaborator.role.replace('-', ' ')}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Rep: {collaborator.reputation}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div>
                              {collaborator.currentSection ? (
                                <span>Working on: {collaborator.currentSection}</span>
                              ) : (
                                <span>Last active: {collaborator.lastActive.toLocaleTimeString()}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              {collaborator.contribution > 0 && (
                                <span className="text-xs">
                                  {collaborator.contribution}% contribution
                                </span>
                              )}
                              <Button variant="ghost" size="sm" className="h-8">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Invite New Collaborator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input placeholder="Enter email address" className="flex-1" />
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Send Invite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        )}

        {activeView === 'versions' && (
          <ScrollArea className="h-full p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Version History</h3>
                <Button variant="outline" size="sm">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Create Branch
                </Button>
              </div>

              {versions.map((version) => (
                <Card key={version.id} className={`${version.isActive ? 'border-green-300 bg-green-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={version.authorAvatar} />
                        <AvatarFallback>{version.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">Version {version.version}</h4>
                          {version.isActive && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Current
                            </Badge>
                          )}
                          <span className="text-sm text-gray-600">by {version.author}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{version.message}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                          <span className="text-green-600">+{version.stats.additions} additions</span>
                          <span className="text-red-600">-{version.stats.deletions} deletions</span>
                          <span className="text-blue-600">{version.stats.modifications} modifications</span>
                          <span>{version.timestamp.toLocaleDateString()}</span>
                        </div>
                        
                        <div className="space-y-1">
                          {version.changes.map((change, idx) => (
                            <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              {change}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        {activeView === 'remixes' && (
          <ScrollArea className="h-full p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Remix Lineage & Attribution</h3>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Original Script Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-medium text-blue-600">{remixLineage.length}</div>
                      <div className="text-xs text-gray-600">Total Remixes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-green-600">
                        {Math.round(remixLineage.reduce((acc, r) => acc + r.popularity, 0) / remixLineage.length)}
                      </div>
                      <div className="text-xs text-gray-600">Avg Popularity</div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-purple-600">
                        {(remixLineage.reduce((acc, r) => acc + r.rating, 0) / remixLineage.length).toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-600">Avg Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {remixLineage.map((remix) => (
                  <Card key={remix.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <GitBranch className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{remix.remixTitle}</h4>
                            <Badge variant="outline" className="text-xs">
                              Remix
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            by {remix.remixAuthor} • {remix.remixDate.toLocaleDateString()}
                          </p>
                          
                          <p className="text-xs text-gray-500 mb-3 italic">
                            {remix.attribution}
                          </p>
                          
                          <div className="space-y-1 mb-3">
                            {remix.changes.map((change, idx) => (
                              <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                {change}
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-green-600" />
                              <span>{remix.popularity} uses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span>{remix.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default CollaborationManager;