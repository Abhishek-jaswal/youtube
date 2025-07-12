import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, FileText, Image, Mic, Wand2, Play, Download } from 'lucide-react';
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

interface ContentGeneratorProps {
  contentIdeas: ContentIdea[];
  onVideoGenerated: (video: VideoContent) => void;
  isGenerating: boolean;
  onGenerateVideo: (idea: ContentIdea) => void;
}

export function ContentGenerator({ 
  contentIdeas, 
  onVideoGenerated, 
  isGenerating, 
  onGenerateVideo 
}: ContentGeneratorProps) {
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [customScript, setCustomScript] = useState('');
  const [generationStep, setGenerationStep] = useState<'script' | 'visuals' | 'voiceover' | 'complete'>('script');
  const { toast } = useToast();

  const generateScript = async (idea: ContentIdea) => {
    setGenerationStep('script');
    
    // Simulate script generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const script = `
HOOK (0-3 seconds):
"What if I told you that ${idea.title.toLowerCase()} could completely transform your results?"

INTRODUCTION (3-15 seconds):
Hey everyone! Today we're diving deep into something that most people completely overlook...

MAIN CONTENT (15-90 seconds):
${idea.description}

Here's what you need to know:
1. The most important factor that everyone misses
2. The simple technique that changes everything  
3. Why timing matters more than you think

CALL TO ACTION (90-100 seconds):
If this helped you, smash that like button and subscribe for more content like this!

[END SCREEN with related videos]
    `.trim();
    
    const updatedIdea = { ...idea, script };
    setSelectedIdea(updatedIdea);
    setCustomScript(script);
    
    toast({
      title: "Script Generated!",
      description: "AI has created an engaging script for your video"
    });
  };

  const generateVisuals = async () => {
    setGenerationStep('visuals');
    
    // Simulate visual generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (selectedIdea) {
      const visuals = [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600', 
        '/api/placeholder/800/600'
      ];
      
      setSelectedIdea({ ...selectedIdea, visuals });
      
      toast({
        title: "Visuals Generated!",
        description: "AI has created compelling visuals for your video"
      });
    }
  };

  const generateVoiceover = async () => {
    setGenerationStep('voiceover');
    
    // In real implementation, this would use ElevenLabs API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (selectedIdea) {
      setSelectedIdea({ ...selectedIdea, voiceover: '/api/placeholder/audio.mp3' });
      
      toast({
        title: "Voiceover Generated!",
        description: "AI has created professional voiceover for your video"
      });
    }
  };

  const completeGeneration = async () => {
    if (selectedIdea) {
      setGenerationStep('complete');
      onGenerateVideo(selectedIdea);
    }
  };

  if (contentIdeas.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Content Ideas Yet</h3>
          <p className="text-muted-foreground">
            Go to Trend Analysis first to generate content ideas
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Content Ideas Selection */}
      {!selectedIdea && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Select Content to Generate</h3>
          <div className="grid gap-4">
            {contentIdeas.map((idea) => (
              <Card key={idea.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{idea.title}</h4>
                      <p className="text-muted-foreground mb-3">{idea.description}</p>
                      <div className="flex gap-2">
                        {idea.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setSelectedIdea(idea);
                        generateScript(idea);
                      }}
                      className="ml-4"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Generation Process */}
      {selectedIdea && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Generating: {selectedIdea.title}</h3>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedIdea(null);
                setCustomScript('');
                setGenerationStep('script');
              }}
            >
              Start Over
            </Button>
          </div>

          <Tabs defaultValue="script" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="script" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Script
              </TabsTrigger>
              <TabsTrigger value="visuals" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Visuals
              </TabsTrigger>
              <TabsTrigger value="voiceover" className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voiceover
              </TabsTrigger>
              <TabsTrigger value="final" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Final
              </TabsTrigger>
            </TabsList>

            <TabsContent value="script" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Script</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={customScript}
                    onChange={(e) => setCustomScript(e.target.value)}
                    placeholder="AI-generated script will appear here..."
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => generateScript(selectedIdea)}>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Regenerate Script
                    </Button>
                    <Button onClick={generateVisuals} disabled={!customScript}>
                      Next: Generate Visuals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visuals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedIdea.visuals ? (
                    <div className="grid grid-cols-3 gap-4">
                      {selectedIdea.visuals.map((visual, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <Image className="w-12 h-12 mx-auto mb-4" />
                      <p>Visuals will be generated here</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={generateVisuals} disabled={generationStep === 'visuals'}>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Visuals
                    </Button>
                    <Button onClick={generateVoiceover} disabled={!selectedIdea.visuals}>
                      Next: Generate Voiceover
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voiceover" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Voiceover</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedIdea.voiceover ? (
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Mic className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">Voiceover Ready</p>
                        <p className="text-sm text-muted-foreground">Professional AI voice generated</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <Mic className="w-12 h-12 mx-auto mb-4" />
                      <p>Voiceover will be generated here</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={generateVoiceover} disabled={generationStep === 'voiceover'}>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Voiceover
                    </Button>
                    <Button onClick={completeGeneration} disabled={!selectedIdea.voiceover}>
                      Complete Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="final" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Final Video</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <p className="font-medium">Video Ready for Review</p>
                      <p className="text-sm text-muted-foreground">All elements combined successfully</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={completeGeneration}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}