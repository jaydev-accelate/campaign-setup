import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Star,
  LineChart,
  PieChart,
  Activity,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface PredictiveMetric {
  id: string;
  name: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  category: 'engagement' | 'wellness' | 'satisfaction' | 'retention';
  timeframe: string;
  factors: string[];
}

interface OutcomeSimulation {
  id: string;
  scenario: string;
  description: string;
  probability: number;
  impact: 'high' | 'medium' | 'low';
  metrics: {
    engagement: number;
    satisfaction: number;
    completion: number;
    retention: number;
  };
  recommendations: string[];
}

interface CausalFactor {
  id: string;
  name: string;
  impact: number;
  confidence: number;
  category: 'content' | 'timing' | 'personalization' | 'delivery';
  description: string;
}

interface PerformanceInsight {
  id: string;
  type: 'optimization' | 'warning' | 'opportunity';
  title: string;
  description: string;
  impact: number;
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
}

const AdvancedAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Predictive metrics
  const predictiveMetrics: PredictiveMetric[] = [
    {
      id: 'engagement',
      name: 'User Engagement',
      currentValue: 78,
      predictedValue: 85,
      confidence: 92,
      trend: 'up',
      category: 'engagement',
      timeframe: '7 days',
      factors: ['Content optimization', 'Improved pacing', 'Better personalization']
    },
    {
      id: 'satisfaction',
      name: 'Session Satisfaction',
      currentValue: 82,
      predictedValue: 88,
      confidence: 87,
      trend: 'up',
      category: 'satisfaction',
      timeframe: '14 days',
      factors: ['Enhanced audio quality', 'Refined script flow', 'Added nature imagery']
    },
    {
      id: 'completion',
      name: 'Completion Rate',
      currentValue: 74,
      predictedValue: 79,
      confidence: 89,
      trend: 'up',
      category: 'engagement',
      timeframe: '21 days',
      factors: ['Optimized session length', 'Better hook sequences', 'Reduced complexity']
    },
    {
      id: 'retention',
      name: 'User Retention',
      currentValue: 65,
      predictedValue: 62,
      confidence: 75,
      trend: 'down',
      category: 'retention',
      timeframe: '30 days',
      factors: ['Market saturation', 'Seasonal effects', 'Competition increase']
    }
  ];

  // Outcome simulations
  const outcomeSimulations: OutcomeSimulation[] = [
    {
      id: 'optimistic',
      scenario: 'Optimistic Outcome',
      description: 'All planned improvements implemented successfully',
      probability: 35,
      impact: 'high',
      metrics: {
        engagement: 92,
        satisfaction: 95,
        completion: 88,
        retention: 78
      },
      recommendations: [
        'Implement AI-powered personalization',
        'Add interactive elements',
        'Enhance multi-sensory experience'
      ]
    },
    {
      id: 'realistic',
      scenario: 'Most Likely Outcome',
      description: 'Moderate improvements with current trajectory',
      probability: 55,
      impact: 'medium',
      metrics: {
        engagement: 83,
        satisfaction: 86,
        completion: 81,
        retention: 68
      },
      recommendations: [
        'Focus on content quality improvements',
        'Optimize pacing and transitions',
        'Enhance user onboarding'
      ]
    },
    {
      id: 'conservative',
      scenario: 'Conservative Outcome',
      description: 'Minimal improvements, potential challenges',
      probability: 10,
      impact: 'low',
      metrics: {
        engagement: 76,
        satisfaction: 79,
        completion: 73,
        retention: 58
      },
      recommendations: [
        'Address fundamental content issues',
        'Improve technical delivery',
        'Enhance user support systems'
      ]
    }
  ];

  // Causal factors
  const causalFactors: CausalFactor[] = [
    {
      id: 'voice_quality',
      name: 'Voice Quality & Tone',
      impact: 23,
      confidence: 94,
      category: 'delivery',
      description: 'AI-generated voice naturalness and emotional resonance'
    },
    {
      id: 'personalization',
      name: 'Content Personalization',
      impact: 19,
      confidence: 87,
      category: 'personalization',
      description: 'Adaptation to user demographics and preferences'
    },
    {
      id: 'pacing',
      name: 'Session Pacing',
      impact: 17,
      confidence: 91,
      category: 'timing',
      description: 'Rhythm and flow of meditation guidance'
    },
    {
      id: 'imagery',
      name: 'Visualization Content',
      impact: 15,
      confidence: 83,
      category: 'content',
      description: 'Quality and relevance of guided imagery'
    },
    {
      id: 'length',
      name: 'Session Duration',
      impact: 12,
      confidence: 89,
      category: 'timing',
      description: 'Optimal session length for user engagement'
    },
    {
      id: 'background',
      name: 'Audio Background',
      impact: 8,
      confidence: 76,
      category: 'delivery',
      description: 'Music and ambient sounds quality'
    },
    {
      id: 'transitions',
      name: 'Section Transitions',
      impact: 6,
      confidence: 82,
      category: 'content',
      description: 'Smoothness between meditation phases'
    }
  ];

  // Performance insights
  const performanceInsights: PerformanceInsight[] = [
    {
      id: 'voice_optimization',
      type: 'optimization',
      title: 'Voice Synthesis Enhancement Opportunity',
      description: 'Upgrading to premium voice models could increase satisfaction by 12%',
      impact: 12,
      actionable: true,
      priority: 'high'
    },
    {
      id: 'length_warning',
      type: 'warning',
      title: 'Session Length Optimization Needed',
      description: 'Current 15-minute sessions show 23% higher dropout after minute 12',
      impact: -8,
      actionable: true,
      priority: 'medium'
    },
    {
      id: 'personalization_opportunity',
      type: 'opportunity',
      title: 'Advanced Personalization Potential',
      description: 'Demographic-specific adaptations could boost engagement by 18%',
      impact: 18,
      actionable: false,
      priority: 'high'
    },
    {
      id: 'retention_warning',
      type: 'warning',
      title: 'Retention Trend Concern',
      description: 'User retention showing decline trend - investigation recommended',
      impact: -15,
      actionable: true,
      priority: 'high'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'opportunity': return <Lightbulb className="w-4 h-4 text-green-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setTimeout(() => setSimulationRunning(false), 3000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Advanced Analytics</h2>
              <p className="text-sm text-gray-600">Predictive outcome scoring & causal intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button 
                variant={selectedTimeframe === '7d' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setSelectedTimeframe('7d')}
                className="text-xs"
              >
                7D
              </Button>
              <Button 
                variant={selectedTimeframe === '30d' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setSelectedTimeframe('30d')}
                className="text-xs"
              >
                30D
              </Button>
              <Button 
                variant={selectedTimeframe === '90d' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setSelectedTimeframe('90d')}
                className="text-xs"
              >
                90D
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={runSimulation} 
              disabled={simulationRunning}
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${simulationRunning ? 'animate-spin' : ''}`} />
              {simulationRunning ? 'Running...' : 'Run Simulation'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="predictions" className="h-full flex flex-col">
          <div className="border-b border-gray-200 px-6 pt-4">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="simulations">Simulations</TabsTrigger>
              <TabsTrigger value="causal">Causal Analysis</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="predictions" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                {/* Key Metrics Overview */}
                <div className="grid grid-cols-4 gap-4">
                  {predictiveMetrics.map((metric) => (
                    <Card key={metric.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-sm">{metric.name}</h4>
                          {getTrendIcon(metric.trend)}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Current</span>
                            <span className="font-medium">{metric.currentValue}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Predicted</span>
                            <span className="font-medium text-blue-600">{metric.predictedValue}%</span>
                          </div>
                          <Progress value={metric.predictedValue} className="h-2" />
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Confidence</span>
                            <span className="text-green-600">{metric.confidence}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detailed Predictions */}
                <div className="space-y-4">
                  <h3 className="font-medium">Detailed Predictions</h3>
                  {predictiveMetrics.map((metric) => (
                    <Card key={metric.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium">{metric.name}</h4>
                            <p className="text-sm text-gray-600">
                              Expected improvement over {metric.timeframe}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {metric.confidence}% confidence
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-medium text-gray-600">{metric.currentValue}%</div>
                            <div className="text-xs text-gray-500">Current</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-medium text-blue-600">{metric.predictedValue}%</div>
                            <div className="text-xs text-gray-500">Predicted</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl font-medium ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                              {metric.predictedValue > metric.currentValue ? '+' : ''}{metric.predictedValue - metric.currentValue}%
                            </div>
                            <div className="text-xs text-gray-500">Change</div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-2">Key Influencing Factors:</h5>
                          <div className="flex flex-wrap gap-1">
                            {metric.factors.map((factor, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="simulations" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Outcome Simulations</h3>
                  <Badge variant="secondary" className="text-xs">
                    {simulationRunning ? 'Calculating...' : 'Last updated: 2 hours ago'}
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {outcomeSimulations.map((simulation) => (
                    <Card key={simulation.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-lg">{simulation.scenario}</h4>
                            <p className="text-sm text-gray-600">{simulation.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-medium text-blue-600">{simulation.probability}%</div>
                            <div className="text-xs text-gray-500">Probability</div>
                            <Badge className={`text-xs mt-1 ${getImpactColor(simulation.impact)}`}>
                              {simulation.impact} impact
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-xl font-medium text-green-600">{simulation.metrics.engagement}%</div>
                            <div className="text-xs text-gray-600">Engagement</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-medium text-blue-600">{simulation.metrics.satisfaction}%</div>
                            <div className="text-xs text-gray-600">Satisfaction</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-medium text-purple-600">{simulation.metrics.completion}%</div>
                            <div className="text-xs text-gray-600">Completion</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-medium text-orange-600">{simulation.metrics.retention}%</div>
                            <div className="text-xs text-gray-600">Retention</div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium mb-2">Recommended Actions:</h5>
                          <div className="space-y-1">
                            {simulation.recommendations.map((rec, idx) => (
                              <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="causal" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                <h3 className="font-medium">Causal Factor Analysis</h3>
                
                {/* Impact Distribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Factor Impact Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {causalFactors.map((factor) => (
                        <div key={factor.id} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-medium">{factor.name}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">{factor.impact}% impact</span>
                              <span className="text-xs text-green-600">{factor.confidence}% confidence</span>
                            </div>
                            <Progress value={factor.impact * 4} className="h-2" />
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {factor.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Factor Analysis */}
                <div className="grid gap-4">
                  {causalFactors.map((factor) => (
                    <Card key={factor.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{factor.name}</h4>
                            <p className="text-sm text-gray-600">{factor.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-medium text-blue-600">{factor.impact}%</div>
                            <div className="text-xs text-gray-500">Impact</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <Progress value={factor.confidence} className="h-2 mb-1" />
                            <div className="text-xs text-gray-600">Confidence: {factor.confidence}%</div>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {factor.category}
                            </Badge>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm" className="text-xs">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="insights" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">AI-Generated Performance Insights</h3>
                  <Button variant="outline" size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate New Insights
                  </Button>
                </div>

                <div className="grid gap-4">
                  {performanceInsights.map((insight) => (
                    <Card key={insight.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            {getInsightIcon(insight.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{insight.title}</h4>
                              <Badge variant="outline" className={`text-xs capitalize ${
                                insight.priority === 'high' ? 'border-red-300 text-red-700' :
                                insight.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                                'border-blue-300 text-blue-700'
                              }`}>
                                {insight.priority} priority
                              </Badge>
                              {insight.actionable && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  Actionable
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Potential Impact:</span>
                                <span className={`text-sm font-medium ${
                                  insight.impact > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {insight.impact > 0 ? '+' : ''}{insight.impact}%
                                </span>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  Learn More
                                </Button>
                                {insight.actionable && (
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Take Action
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-medium text-blue-600">
                          {performanceInsights.filter(i => i.actionable).length}
                        </div>
                        <div className="text-xs text-gray-600">Actionable Insights</div>
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-green-600">
                          +{Math.round(performanceInsights.filter(i => i.impact > 0).reduce((acc, i) => acc + i.impact, 0))}%
                        </div>
                        <div className="text-xs text-gray-600">Potential Improvement</div>
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-red-600">
                          {performanceInsights.filter(i => i.priority === 'high').length}
                        </div>
                        <div className="text-xs text-gray-600">High Priority Items</div>
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-purple-600">
                          {Math.round(performanceInsights.reduce((acc, i) => acc + (i.actionable ? 1 : 0), 0) / performanceInsights.length * 100)}%
                        </div>
                        <div className="text-xs text-gray-600">Implementation Ready</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;