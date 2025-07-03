import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeciesCard } from "@/components/SpeciesCard";
import { getAllSpecies, Species } from "@/data/ecosystems";
import { Star, Share2, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function ExhibitPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteSpecies, setFavoriteSpecies] = useState<Species[]>([]);

  const allSpecies = getAllSpecies();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('biodiversity-favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavorites(favoriteIds);
      
      const species = allSpecies.filter(s => favoriteIds.includes(s.id));
      setFavoriteSpecies(species);
    }
  }, []);

  const handleViewSpecies = (speciesId: string) => {
    navigate(`/species/${speciesId}`);
  };

  const handleRemoveFavorite = (speciesId: string) => {
    const newFavorites = favorites.filter(id => id !== speciesId);
    setFavorites(newFavorites);
    setFavoriteSpecies(favoriteSpecies.filter(s => s.id !== speciesId));
    localStorage.setItem('biodiversity-favorites', JSON.stringify(newFavorites));
    toast.success("Removed from your exhibit");
  };

  const handleShareExhibit = () => {
    if (navigator.share && favoriteSpecies.length > 0) {
      navigator.share({
        title: 'My Biodiversity Exhibit',
        text: `Check out my curated collection of ${favoriteSpecies.length} amazing species!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Exhibit link copied to clipboard!");
    }
  };

  const handleClearAll = () => {
    setFavorites([]);
    setFavoriteSpecies([]);
    localStorage.removeItem('biodiversity-favorites');
    toast.success("Exhibit cleared");
  };

  const ecosystemCounts = favoriteSpecies.reduce((acc, species) => {
    acc[species.ecosystem] = (acc[species.ecosystem] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const conservationCounts = favoriteSpecies.reduce((acc, species) => {
    acc[species.conservationStatus] = (acc[species.conservationStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Star className="h-8 w-8 text-yellow-500" />
            My Digital Museum Exhibit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your curated collection of fascinating species from around the world.
          </p>
        </div>

        {favoriteSpecies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Star className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your exhibit is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring ecosystems and species to build your personalized digital museum exhibit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/search')} size="lg">
                Discover Species
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} size="lg">
                Explore Ecosystems
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Exhibit Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Collection Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {favoriteSpecies.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Species in your exhibit
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Ecosystems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(ecosystemCounts).map(([ecosystem, count]) => (
                      <div key={ecosystem} className="flex justify-between text-sm">
                        <span className="capitalize">{ecosystem}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Conservation Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(conservationCounts).map(([status, count]) => (
                      <div key={status} className="flex justify-between text-sm">
                        <span>{status}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <Button onClick={handleShareExhibit} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Exhibit
              </Button>
              <Button variant="outline" onClick={() => navigate('/search')}>
                Add More Species
              </Button>
              <Button 
                variant="outline" 
                className="text-destructive hover:text-destructive"
                onClick={handleClearAll}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>

            {/* Species Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteSpecies.map((species) => (
                <div key={species.id} className="relative">
                  <SpeciesCard
                    species={species}
                    onViewDetails={handleViewSpecies}
                    isFavorited={true}
                    onToggleFavorite={handleRemoveFavorite}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}