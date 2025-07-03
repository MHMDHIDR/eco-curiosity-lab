import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Globe, Heart, Target, ExternalLink } from "lucide-react";

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            About Explore Earth
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the incredible diversity of life on our planet through an interactive, educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  Explore Earth aims to make biodiversity education accessible, engaging, and inspiring for learners of all ages. 
                  We believe that understanding and appreciating the natural world is crucial for its conservation and our collective future.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Why Biodiversity Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground">
                  <li>• Supports ecosystem stability and resilience</li>
                  <li>• Provides essential resources for medicine, food, and materials</li>
                  <li>• Offers natural solutions to climate change</li>
                  <li>• Contributes to cultural and spiritual well-being</li>
                  <li>• Maintains the beauty and wonder of our natural world</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Ecosystem Explorer</h4>
                    <p className="text-sm text-muted-foreground">
                      Journey through Earth's diverse habitats from rainforests to ocean depths.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Species Discovery</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn about fascinating species with detailed information and fun facts.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Digital Museum</h4>
                    <p className="text-sm text-muted-foreground">
                      Create your own curated collection of favorite species.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Conservation Awareness</h4>
                    <p className="text-sm text-muted-foreground">
                      Understand the conservation status and threats facing different species.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  Our content is based on scientific research and data from reputable sources:
                </p>
                <div className="space-y-2">
                  <a 
                    href="https://www.gbif.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Global Biodiversity Information Facility (GBIF)
                  </a>
                  <a 
                    href="https://www.inaturalist.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    iNaturalist
                  </a>
                  <a 
                    href="https://www.iucnredlist.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    IUCN Red List of Threatened Species
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Ready to Start Exploring?</h3>
              <p className="text-muted-foreground mb-6">
                Dive into the amazing world of biodiversity and start your journey of discovery today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/')} size="lg">
                  Explore Ecosystems
                </Button>
                <Button variant="outline" onClick={() => navigate('/search')} size="lg">
                  Search Species
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}