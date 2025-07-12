import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Clock, Target, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  trending_score: number;
  estimated_views: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  performance_prediction: {
    engagement_score: number;
    viral_potential: number;
    retention_score: number;
  };
}

interface TrendAnalysisProps {
  onIdeasGenerated: (ideas: ContentIdea[]) => void;
}

export function TrendAnalysis({ onIdeasGenerated }: TrendAnalysisProps) {
  const [niche, setNiche] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [trends, setTrends] = useState<ContentIdea[]>([]);
  const { toast } = useToast();

  const generateTrendingIdeas = async () => {
    if (!niche.trim()) {
      toast({
        title: "Please enter a niche",
        description: "Specify your content niche to analyze trends",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call - in real implementation, this would call trend analysis APIs
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockIdeas: ContentIdea[] = [
        {
          id: '1',
          title: `10 ${niche} Secrets That Will Change Your Life`,
          description: `Reveal insider secrets about ${niche} that most people don't know`,
          trending_score: 94,
          estimated_views: 45000,
          difficulty: 'Easy',
          tags: ['secrets', 'tips', niche.toLowerCase()],
          performance_prediction: {
            engagement_score: 87,
            viral_potential: 92,
            retention_score: 78
          }
        },
        {
          id: '2',
          title: `I Tried ${niche} for 30 Days - Here's What Happened`,
          description: `Document a 30-day journey exploring ${niche} with daily updates`,
          trending_score: 89,
          estimated_views: 38000,
          difficulty: 'Medium',
          tags: ['challenge', 'transformation', niche.toLowerCase()],
          performance_prediction: {
            engagement_score: 91,
            viral_potential: 85,
            retention_score: 88
          }
        },
        {
          id: '3',
          title: `${niche} Myths DEBUNKED by Experts`,
          description: `Collaborate with experts to debunk common myths about ${niche}`,
          trending_score: 82,
          estimated_views: 29000,
          difficulty: 'Hard',
          tags: ['myths', 'expert', 'education', niche.toLowerCase()],
          performance_prediction: {
            engagement_score: 79,
            viral_potential: 74,
            retention_score: 92
          }
        }
      ];
      
      setTrends(mockIdeas);
      onIdeasGenerated(mockIdeas);
      
      toast({
        title: "Trends Analyzed!",
        description: `Found ${mockIdeas.length} trending opportunities in ${niche}`
      });
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze trends. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter your content niche (e.g., fitness, cooking, tech)"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={generateTrendingIdeas} 
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Analyze Trends
                </>
              )}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            AI will analyze current trends, viral patterns, and audience interests to generate content ideas
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {trends.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Trending Content Ideas
          </h3>
          
          <div className="grid gap-4">
            {trends.map((idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{idea.title}</h4>
                      <p className="text-muted-foreground mb-3">{idea.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {idea.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <Badge className={getDifficultyColor(idea.difficulty)}>
                        {idea.difficulty}
                      </Badge>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {idea.trending_score}% trending
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-semibold text-lg">{idea.estimated_views.toLocaleString()}</div>
                      <div className="text-muted-foreground">Est. Views</div>
                    </div>
                    
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-semibold text-lg">{idea.performance_prediction.engagement_score}%</div>
                      <div className="text-muted-foreground">Engagement</div>
                    </div>
                    
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-semibold text-lg">{idea.performance_prediction.viral_potential}%</div>
                      <div className="text-muted-foreground">Viral Potential</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}