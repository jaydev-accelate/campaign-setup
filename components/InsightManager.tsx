import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { motion } from 'motion/react';

interface ClientInsight {
  id: string;
  clientId: string;
  clientName: string;
  sessionDate: Date;
  scriptUsed: string;
  feedback: string;
  rating: number;
  emotionalState: 'improved' | 'neutral' | 'declined';
  keyMetrics: {
    engagement: number;
    relaxation: number;
    clarity: number;
    satisfaction: number;
  };
  suggestions: string[];
  implementedChanges?: string[];
}

interface AIRecommendation {
  id: string;
  type: 'script_improvement' | 'element_addition' | 'personalization' | 'timing_adjustment';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  reasoning: string;
  expectedImprovement: number;
  basedOnInsights: string[];
  actionable: boolean;
}

const InsightManager: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'insights' | 'recommendations' | 'analytics'>('insights');

  // Sample client insights data
  const clientInsights: ClientInsight[] = [
    {
      id: '1',
      clientId: 'c1',
      clientName: 'Sarah M.',
      sessionDate: new Date('2024-01-15'),
      scriptUsed: 'Root Chakra Grounding',
      feedback: 'The breathing technique was perfect, but I wished there was more nature imagery in the beginning.',
      rating: 4,
      emotionalState: 'improved',
      keyMetrics: {
        engagement: 85,
        relaxation: 90,
        clarity: 78,
        satisfaction: 85
      },
      suggestions: ['Add forest visualization', 'Extend breathing section'],
      implementedChanges: ['Extended breathing from 2min to 3min']
    },
    {
      id: '2',
      clientId: 'c2',
      clientName: 'Michael R.',
      sessionDate: new Date('2024-01-14'),
      scriptUsed: 'Stress Relief Journey',
      feedback: 'Amazing session! The progressive relaxation worked wonders. Could use more guidance on maintaining the state afterward.',
      rating: 5,
      emotionalState: 'improved',
      keyMetrics: {
        engagement: 95,
        relaxation: 95,
        clarity: 88,
        satisfaction: 95
      },
      suggestions: ['Add integration techniques', 'Include daily practice reminders'],
    },
    {
      id: '3',
      clientId: 'c3',
      clientName: 'Emma L.',
      sessionDate: new Date('2024-01-13'),
      scriptUsed: 'Heart Chakra Opening',
      feedback: 'The emotional part was intense, maybe too fast. I needed more time to process each step.',
      rating: 3,
      emotionalState: 'neutral',
      keyMetrics: {
        engagement: 70,
        relaxation: 65,
        clarity: 60,
        satisfaction: 68
      },
      suggestions: ['Slow down emotional sections', 'Add processing pauses', 'Include gentle transitions'],
    }
  ];

  // AI-generated recommendations based on insights
  const aiRecommendations: AIRecommendation[] = [
    {
      id: 'r1',
      type: 'script_improvement',
      priority: 'high',
      title: 'Add Nature-Based Opening Sequences',
      description: 'Integrate forest/ocean imagery in first 30 seconds of grounding scripts',
      reasoning: 'Analysis of 15 sessions shows 23% higher engagement when nature imagery is introduced early',
      expectedImprovement: 23,
      basedOnInsights: ['1', '4', '7'],
      actionable: true
    },
    {
      id: 'r2',
      type: 'timing_adjustment',
      priority: 'high',
      title: 'Extend Emotional Processing Time',
      description: 'Increase pause duration between emotional release techniques by 50%',
      reasoning: 'Clients report feeling rushed in emotional sections, leading to incomplete processing',
      expectedImprovement: 18,
      basedOnInsights: ['3', '6'],
      actionable: true
    },
    {
      id: 'r3',
      type: 'element_addition',
      priority: 'medium',
      title: 'Integration & Daily Practice Module',
      description: 'Add 2-minute closing section on maintaining wellness states in daily life',
      reasoning: 'High satisfaction clients request guidance on extending benefits beyond sessions',
      expectedImprovement: 15,
      basedOnInsights: ['2', '5'],
      actionable: true
    },
    {
      id: 'r4',
      type: 'personalization',
      priority: 'medium',
      title: 'Profession-Specific Adaptations',
      description: 'Create variations for healthcare workers with medical terminology integration',
      reasoning: 'Healthcare professionals show 12% higher engagement with familiar terminology',
      expectedImprovement: 12,
      basedOnInsights: ['8', '9', '10'],
      actionable: false
    }
  ];

  const getMetricIcon = (emotionalState: string) => {
    switch (emotionalState) {
      case 'improved': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'declined': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-300 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-300 bg-blue-50 text-blue-800';
      default: return 'border-gray-300 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Insight Manager</h2>
              <p className="text-sm text-gray-600">AI-powered client feedback integration & script optimization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {clientInsights.length} Recent Sessions
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {aiRecommendations.filter(r => r.actionable).length} Actionable Recommendations
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mt-4 bg-gray-100 rounded-lg p-1">
          <Button
            variant={selectedView === 'insights' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedView('insights')}
            className="flex-1 text-xs"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Client Insights
          </Button>
          <Button
            variant={selectedView === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedView('recommendations')}
            className="flex-1 text-xs"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            AI Recommendations
          </Button>
          <Button
            variant={selectedView === 'analytics' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedView('analytics')}
            className="flex-1 text-xs"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {selectedView === 'insights' && (
          <ScrollArea className="h-full p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Client Feedback</h3>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Last 7 Days
                </Button>
              </div>

              {clientInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{insight.clientName}</h4>
                        <p className="text-sm text-gray-600">{insight.scriptUsed}</p>
                        <p className="text-xs text-gray-500">
                          {insight.sessionDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getMetricIcon(insight.emotionalState)}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < insight.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 italic">"{insight.feedback}"</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {Object.entries(insight.keyMetrics).map(([metric, value]) => (
                      <div key={metric} className="text-center">
                        <div className="text-xs text-gray-600 mb-1 capitalize">{metric}</div>
                        <div className="font-medium text-sm">{value}%</div>
                        <Progress value={value} className="h-1 mt-1" />
                      </div>
                    ))}
                  </div>

                  {/* Suggestions & Implementations */}
                  <div className="space-y-2">
                    {insight.suggestions.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-gray-600 mb-1">Client Suggestions:</div>
                        <div className="flex flex-wrap gap-1">
                          {insight.suggestions.map((suggestion, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {insight.implementedChanges && (
                      <div>
                        <div className="text-xs font-medium text-green-600 mb-1">Implemented Changes:</div>
                        <div className="flex flex-wrap gap-1">
                          {insight.implementedChanges.map((change, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {change}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {selectedView === 'recommendations' && (
          <ScrollArea className="h-full p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">AI-Generated Recommendations</h3>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Auto-Apply Safe Changes
                </Button>
              </div>

              {aiRecommendations.map((recommendation) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{recommendation.title}</h4>
                        <Badge className={`text-xs ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority.toUpperCase()}
                        </Badge>
                        {recommendation.actionable && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Ready to Apply
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{recommendation.description}</p>
                      <p className="text-xs text-gray-600 mb-3">{recommendation.reasoning}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Expected improvement: +{recommendation.expectedImprovement}%
                        </div>
                        <div>
                          Based on {recommendation.basedOnInsights.length} client insights
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {recommendation.actionable ? (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Apply Now
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Requires Manual Review
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {selectedView === 'analytics' && (
          <ScrollArea className="h-full p-6">
            <div className="space-y-6">
              <h3 className="font-medium">Performance Analytics Dashboard</h3>
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-medium text-green-600">4.2</div>
                    <div className="text-xs text-gray-600">Avg Session Rating</div>
                    <div className="text-xs text-green-600 mt-1">↑ 0.3 vs last month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-medium text-blue-600">82%</div>
                    <div className="text-xs text-gray-600">Client Satisfaction</div>
                    <div className="text-xs text-blue-600 mt-1">↑ 5% vs last month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-medium text-purple-600">94%</div>
                    <div className="text-xs text-gray-600">Relaxation Achievement</div>
                    <div className="text-xs text-purple-600 mt-1">↑ 2% vs last month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-medium text-orange-600">156</div>
                    <div className="text-xs text-gray-600">Sessions This Month</div>
                    <div className="text-xs text-orange-600 mt-1">↑ 12% vs last month</div>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Script Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Root Chakra Grounding</div>
                        <div className="text-xs text-gray-600">Most improved script this month</div>
                      </div>
                      <div className="text-green-600 font-medium">+15% satisfaction</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Heart Chakra Opening</div>
                        <div className="text-xs text-gray-600">Consistent high performer</div>
                      </div>
                      <div className="text-blue-600 font-medium">4.6★ average</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Stress Relief Journey</div>
                        <div className="text-xs text-gray-600">Needs attention - slower pacing requested</div>
                      </div>
                      <div className="text-yellow-600 font-medium">Under review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Demographics Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Demographic Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Age Group Performance</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>25-34: Prefers faster pacing</span>
                          <span className="text-green-600">+8% engagement</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>35-44: Loves nature imagery</span>
                          <span className="text-blue-600">+12% relaxation</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>45-54: Needs longer processing</span>
                          <span className="text-purple-600">+6% satisfaction</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Profession-Specific Patterns</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Healthcare Workers</span>
                          <span className="text-green-600">High stress relief focus</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Teachers</span>
                          <span className="text-blue-600">Prefer emotional balance</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Tech Workers</span>
                          <span className="text-purple-600">Focus & clarity priority</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default InsightManager;