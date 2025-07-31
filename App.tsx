import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { ArrowLeft, Sparkles, Settings, HelpCircle, Brain, Package, Users, BarChart3, MessageSquare, Upload } from 'lucide-react';
import AIScriptBuilder from './components/AIScriptBuilder';
import ScriptManager from './components/ScriptManager';
import InsightManager from './components/InsightManager';
import MultimodalOutputManager from './components/MultimodalOutputManager';
import CollaborationManager from './components/CollaborationManager';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import PublishingPlatform from './components/PublishingPlatform';
import { motion, AnimatePresence } from 'motion/react';

type ViewType = 'ai-builder' | 'script-manager' | 'insight-manager' | 'multimodal-output' | 'collaboration' | 'analytics' | 'publishing-platform' | 'traditional';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('ai-builder');
  const [showTraditionalToggle, setShowTraditionalToggle] = useState(false);
  const [showFutureFeatures, setShowFutureFeatures] = useState(false);

  if (currentView === 'script-manager') {
    return <ScriptManager />;
  }

  if (currentView === 'insight-manager') {
    return <InsightManager />;
  }

  if (currentView === 'multimodal-output') {
    return <MultimodalOutputManager />;
  }

  if (currentView === 'collaboration') {
    return <CollaborationManager />;
  }

  if (currentView === 'analytics') {
    return <AdvancedAnalytics />;
  }

  if (currentView === 'publishing-platform') {
    return <PublishingPlatform />;
  }

  if (currentView === 'traditional') {
    // This would be the old 12-page flow for comparison
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-medium">Traditional 12-Step Process</h2>
          <p className="text-gray-600">This would be the old multi-page workflow</p>
          <Button onClick={() => setCurrentView('ai-builder')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AI Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-medium">AURELIA Wellness Platform</h1>
              <p className="text-xs text-gray-600">AI-Powered Wellness Experience Builder</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFutureFeatures(!showFutureFeatures)}
              className="text-xs"
            >
              <Brain className="w-4 h-4 mr-1" />
              Platform Features
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTraditionalToggle(!showTraditionalToggle)}
              className="text-xs"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Compare Workflows
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentView('publishing-platform')}
              className="bg-gradient-to-r from-pink-600 to-orange-600 text-white border-0 hover:from-pink-700 hover:to-orange-700"
            >
              <Upload className="w-4 h-4 mr-1" />
              Publish
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Enhanced Features Navigation */}
        <AnimatePresence>
          {showFutureFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-medium text-sm mb-3">AURELIA Platform Modules</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('ai-builder')}
                    className={`flex flex-col items-center p-3 h-auto ${currentView === 'ai-builder' ? 'border-purple-300 bg-purple-50' : ''}`}
                  >
                    <Sparkles className="w-5 h-5 mb-2 text-purple-600" />
                    <span className="text-xs">AI Script Builder</span>
                    <span className="text-xs text-gray-500">Core Creation</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('publishing-platform')}
                    className={`flex flex-col items-center p-3 h-auto ${currentView === 'publishing-platform' ? 'border-pink-300 bg-pink-50' : ''}`}
                  >
                    <Upload className="w-5 h-5 mb-2 text-pink-600" />
                    <span className="text-xs">Publishing Platform</span>
                    <span className="text-xs text-gray-500">Semantic Media Generation</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('insight-manager')}
                    className={`flex flex-col items-center p-3 h-auto ${currentView === 'insight-manager' ? 'border-blue-300 bg-blue-50' : ''}`}
                  >
                    <MessageSquare className="w-5 h-5 mb-2 text-blue-600" />
                    <span className="text-xs">Insight Manager</span>
                    <span className="text-xs text-gray-500">Client Feedback</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('multimodal-output')}
                    className={`flex flex-col items-center p-3 h-auto ${currentView === 'multimodal-output' ? 'border-orange-300 bg-orange-50' : ''}`}
                  >
                    <Package className="w-5 h-5 mb-2 text-orange-600" />
                    <span className="text-xs">Media Manager</span>
                    <span className="text-xs text-gray-500">Campaign Assets</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('collaboration')}
                    className={`flex flex-col items-center p-3 h-auto ${currentView === 'collaboration' ? 'border-green-300 bg-green-50' : ''}`}
                  >
                    <Users className="w-5 h-5 mb-2 text-green-600" />
                    <span className="text-xs">Collaboration</span>
                    <span className="text-xs text-gray-500">Team Workflow</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('analytics')}
                    className={`flex flex-col items-center p-3 h-auto ${currentView === 'analytics' ? 'border-indigo-300 bg-indigo-50' : ''}`}
                  >
                    <BarChart3 className="w-5 h-5 mb-2 text-indigo-600" />
                    <span className="text-xs">Analytics</span>
                    <span className="text-xs text-gray-500">Performance Intelligence</span>
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                  <h4 className="font-medium text-sm text-purple-900 mb-2">Professional Wellness Platform</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <h5 className="font-medium text-purple-800 mb-1">Creation & Build:</h5>
                      <ul className="text-gray-600 space-y-1">
                        <li>• AURELIA hierarchical system</li>
                        <li>• Conversational AI guidance</li>
                        <li>• Real-time script generation</li>
                        <li>• Semantic dependency management</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 mb-1">Media & Publishing:</h5>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Semantic voice synthesis</li>
                        <li>• Contextual music composition</li>
                        <li>• AI visual generation</li>
                        <li>• Professional export formats</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 mb-1">Professional Intelligence:</h5>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Client feedback integration</li>
                        <li>• Real-time collaboration</li>
                        <li>• Predictive outcome modeling</li>
                        <li>• Performance optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Workflow Comparison Toggle */}
        <AnimatePresence>
          {showTraditionalToggle && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-purple-100 bg-purple-50/50 overflow-hidden"
            >
              <div className="p-4 space-y-3">
                <h3 className="font-medium text-sm">Platform Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-sm text-purple-900 mb-2">AURELIA AI-Native Platform</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Semantic media generation from script context</li>
                      <li>• AI creates voice, music, visuals automatically</li>
                      <li>• Professional quality with customization options</li>
                      <li>• Client feedback integration & optimization</li>
                      <li>• Real-time collaboration & version control</li>
                      <li>• Predictive outcome analytics</li>
                      <li>• One-click publishing to multiple platforms</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Traditional Wellness Tools</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Manual script writing and editing</li>
                      <li>• Separate tools for voice, music, visuals</li>
                      <li>• Generic templates without customization</li>
                      <li>• No integrated feedback mechanisms</li>
                      <li>• Limited collaboration capabilities</li>
                      <li>• Basic usage statistics only</li>
                      <li>• Manual export and distribution</li>
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentView('traditional')}
                      className="w-full mt-2 text-xs"
                    >
                      Compare Traditional Flow
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <AIScriptBuilder />
      </div>

      {/* Enhanced Quick Access Navigation */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('publishing-platform')}
            className="bg-gradient-to-r from-pink-600 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl hover:from-pink-700 hover:to-orange-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Publish Media
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('script-manager')}
            className="bg-white shadow-lg hover:shadow-xl"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Script Manager
          </Button>
          
          {showFutureFeatures && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('insight-manager')}
                className="w-full bg-white shadow-lg hover:shadow-xl"
              >
                <Brain className="w-4 h-4 mr-2" />
                Insights
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('multimodal-output')}
                className="w-full bg-white shadow-lg hover:shadow-xl"
              >
                <Package className="w-4 h-4 mr-2" />
                Media Manager
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('collaboration')}
                className="w-full bg-white shadow-lg hover:shadow-xl"
              >
                <Users className="w-4 h-4 mr-2" />
                Collaborate
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('analytics')}
                className="w-full bg-white shadow-lg hover:shadow-xl"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}