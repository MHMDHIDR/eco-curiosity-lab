import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpeciesCard } from "@/components/SpeciesCard";
import { ecosystems, getSpeciesByEcosystem, Species } from "@/data/ecosystems";
import { Filter, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EcosystemPage() {
  const { ecosystemId } = useParams<{ ecosystemId: string }>();
  const navigate = useNavigate();
  const [filteredSpecies, setFilteredSpecies] = useState<Species[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const ecosystem = ecosystems.find(e => e.id === ecosystemId);
  const species = ecosystem ? getSpeciesByEcosystem(ecosystemId!) : [];

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('biodiversity-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    let filtered = species;

    if (statusFilter !== "all") {
      filtered = filtered.filter(s => s.conservationStatus === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(s => s.type === typeFilter);
    }

    setFilteredSpecies(filtered);
  }, [species, statusFilter, typeFilter]);

  const handleViewSpecies = (speciesId: string) => {
    navigate(`/species/${speciesId}`);
  };

  const handleToggleFavorite = (speciesId: string) => {
    const newFavorites = favorites.includes(speciesId)
      ? favorites.filter(id => id !== speciesId)
      : [...favorites, speciesId];
    
    setFavorites(newFavorites);
    localStorage.setItem('biodiversity-favorites', JSON.stringify(newFavorites));
  };

  if (!ecosystem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ecosystem not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const uniqueTypes = [...new Set(species.map(s => s.type))];
  const uniqueStatuses = [...new Set(species.map(s => s.conservationStatus))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <img
          src={ecosystem.image}
          alt={ecosystem.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {ecosystem.name}
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mb-6">
              {ecosystem.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {ecosystem.characteristics.map((char, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Animal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Conservation Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground">
              Showing {filteredSpecies.length} of {species.length} species
            </div>
          </div>

          {/* Species Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSpecies.map((species) => (
              <SpeciesCard
                key={species.id}
                species={species}
                onViewDetails={handleViewSpecies}
                isFavorited={favorites.includes(species.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          {filteredSpecies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No species found matching your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}