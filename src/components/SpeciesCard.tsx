import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Species, conservationStatusLabels } from "@/data/ecosystems";
import { Star } from "lucide-react";

interface SpeciesCardProps {
  species: Species;
  onViewDetails: (speciesId: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (speciesId: string) => void;
}

export function SpeciesCard({ 
  species, 
  onViewDetails, 
  isFavorited = false, 
  onToggleFavorite 
}: SpeciesCardProps) {
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

  return (
    <Card className="group overflow-hidden hover:shadow-species transition-all duration-300 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/placeholder/400/300';
          }}
        />
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(species.id);
            }}
          >
            <Star className={`h-4 w-4 ${isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
          </Button>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge 
            variant="secondary" 
            className={`text-xs ${getStatusColor(species.conservationStatus)}`}
          >
            {conservationStatusLabels[species.conservationStatus]}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1">{species.name}</h3>
        <p className="text-sm text-muted-foreground italic mb-2">
          {species.scientificName}
        </p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {species.habitat}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onViewDetails(species.id)}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}