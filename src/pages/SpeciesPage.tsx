import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSpeciesById, conservationStatusLabels } from "@/data/ecosystems";
import { ArrowLeft, Star, MapPin, Utensils, Info, Heart } from "lucide-react";

export function SpeciesPage() {
  const { speciesId } = useParams<{ speciesId: string }>();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  const species = speciesId ? getSpeciesById(speciesId) : undefined;

  useEffect(() => {
    if (species) {
      const savedFavorites = localStorage.getItem('biodiversity-favorites');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorited(favorites.includes(species.id));
      }
    }
  }, [species]);

  const handleToggleFavorite = () => {
    if (!species) return;

    const savedFavorites = localStorage.getItem('biodiversity-favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    const newFavorites = isFavorited
      ? favorites.filter((id: string) => id !== species.id)
      : [...favorites, species.id];
    
    setIsFavorited(!isFavorited);
    localStorage.setItem('biodiversity-favorites', JSON.stringify(newFavorites));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LC': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'NT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'VU': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'EN': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'CR': return 'bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (!species) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Species not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden shadow-species">
              <img
                src={species.image}
                alt={species.name}
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/600/400';
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={handleToggleFavorite}
              >
                <Star className={`h-5 w-5 ${isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
              </Button>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{species.name}</h1>
              <p className="text-lg text-muted-foreground italic mb-4">
                {species.scientificName}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(species.conservationStatus)}`}
                >
                  {conservationStatusLabels[species.conservationStatus]}
                </Badge>
                <Badge variant="outline">
                  {species.type.charAt(0).toUpperCase() + species.type.slice(1)}
                </Badge>
                <Badge variant="outline">
                  {species.ecosystem.charAt(0).toUpperCase() + species.ecosystem.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Habitat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{species.habitat}</p>
                  {species.region && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Region: {species.region}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Utensils className="h-5 w-5 text-primary" />
                    Diet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{species.diet}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="h-5 w-5 text-primary" />
                    Fun Fact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{species.funFact}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={handleToggleFavorite}
                className="flex-1"
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Added to Exhibit' : 'Add to My Exhibit'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(`/ecosystem/${species.ecosystem}`)}
              >
                Explore {species.ecosystem.charAt(0).toUpperCase() + species.ecosystem.slice(1)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}