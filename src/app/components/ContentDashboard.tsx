import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Video, Mic, Upload, Sparkles, Eye, ThumbsUp, Clock } from 'lucide-react';
import { TrendAnalysis } from './TrendAnalysis';
import { ContentGenerator } from './ContentGenerator';
import { VideoPreview } from './VideoPreview';
import { useToast } from '@/hooks/use-toast';

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  trending_score: number;
  estimated_views: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  script?: string;
  visuals?: string[];
  voiceover?: string;
  performance_prediction: {
    engagement_score: number;
    viral_potential: number;
    retention_score: number;
  };
}

interface VideoContent {
  id: string;
  title: string;
  script: string;
  visuals: string[];
  voiceover_url?: string;
  thumbnail: string;
  performance_prediction: {
    engagement_score: number;
    viral_potential: number;
    retention_score: number;
  };
}

export function ContentDashboard() {
  const [activeTab, setActiveTab] = useState<'trends' | 'generate' | 'preview'>('trends');
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [generatedVideos, setGeneratedVideos] = useState<VideoContent[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleIdeaGenerated = (ideas: ContentIdea[]) => {
    setContentIdeas(ideas);
    toast({
      title: "Content Ideas Generated!",
      description: `Found ${ideas.length} trending content opportunities`,
    });
  };

  const handleVideoGenerated = (video: VideoContent) => {
    setGeneratedVideos(prev => [...prev, video]);
    setActiveTab('preview');
    toast({
      title: "Video Content Created!",
      description: "Your video is ready for review",
    });
  };

  const generateFullVideo = async (idea: ContentIdea) => {
    setIsGenerating(true);
    setSelectedIdea(idea);
    
    try {
      // This would integrate with your content generation pipeline
      const video: VideoContent = {
        id: `video_${Date.now()}`,
        title: idea.title,
        script: idea.script || `This is a generated script for: ${idea.title}`,
        visuals: idea.visuals || [],
        thumbnail: `/api/placeholder/400/225`,
        performance_prediction: idea.performance_prediction
      };
      
      handleVideoGenerated(video);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate video content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-creator-purple to-creator-blue bg-clip-text text-transparent">
          AI Video Content Creator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate trending content ideas, create full video content with AI, and analyze performance potential
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Button
          variant={activeTab === 'trends' ? 'default' : 'outline'}
          onClick={() => setActiveTab('trends')}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Trend Analysis
        </Button>
        <Button
          variant={activeTab === 'generate' ? 'default' : 'outline'}
          onClick={() => setActiveTab('generate')}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Generate Content
        </Button>
        <Button
          variant={activeTab === 'preview' ? 'default' : 'outline'}
          onClick={() => setActiveTab('preview')}
          className="flex items-center gap-2"
        >
          <Video className="w-4 h-4" />
          Video Preview
        </Button>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'trends' && (
          <TrendAnalysis onIdeasGenerated={handleIdeaGenerated} />
        )}
        
        {activeTab === 'generate' && (
          <ContentGenerator 
            contentIdeas={contentIdeas}
            onVideoGenerated={handleVideoGenerated}
            isGenerating={isGenerating}
            onGenerateVideo={generateFullVideo}
          />
        )}
        
        {activeTab === 'preview' && (
          <VideoPreview videos={generatedVideos} />
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{contentIdeas.length}</div>
            <div className="text-sm text-muted-foreground">Ideas Generated</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Video className="w-8 h-8 mx-auto mb-2 text-creator-purple" />
            <div className="text-2xl font-bold">{generatedVideos.length}</div>
            <div className="text-sm text-muted-foreground">Videos Created</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-creator-blue" />
            <div className="text-2xl font-bold">
              {contentIdeas.reduce((acc, idea) => acc + idea.estimated_views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Est. Views</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold">
              {generatedVideos.length > 0 
                ? Math.round(generatedVideos.reduce((acc, video) => acc + video.performance_prediction.engagement_score, 0) / generatedVideos.length)
                : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Avg. Engagement</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}