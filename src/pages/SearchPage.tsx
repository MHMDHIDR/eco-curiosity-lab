import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SpeciesCard } from "@/components/SpeciesCard";
import { EcosystemCard } from "@/components/EcosystemCard";
import { getAllSpecies, ecosystems, Species } from "@/data/ecosystems";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [ecosystemFilter, setEcosystemFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const allSpecies = getAllSpecies();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('biodiversity-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const filteredSpecies = useMemo(() => {
    return allSpecies.filter((species) => {
      const matchesSearch = searchQuery === "" || 
        species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        species.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        species.habitat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEcosystem = ecosystemFilter === "all" || species.ecosystem === ecosystemFilter;
      const matchesType = typeFilter === "all" || species.type === typeFilter;
      const matchesStatus = statusFilter === "all" || species.conservationStatus === statusFilter;

      return matchesSearch && matchesEcosystem && matchesType && matchesStatus;
    });
  }, [allSpecies, searchQuery, ecosystemFilter, typeFilter, statusFilter]);

  const filteredEcosystems = useMemo(() => {
    return ecosystems.filter((ecosystem) => {
      return searchQuery === "" || 
        ecosystem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ecosystem.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const handleViewSpecies = (speciesId: string) => {
    navigate(`/species/${speciesId}`);
  };

  const handleExploreEcosystem = (ecosystemId: string) => {
    navigate(`/ecosystem/${ecosystemId}`);
  };

  const handleToggleFavorite = (speciesId: string) => {
    const newFavorites = favorites.includes(speciesId)
      ? favorites.filter(id => id !== speciesId)
      : [...favorites, speciesId];
    
    setFavorites(newFavorites);
    localStorage.setItem('biodiversity-favorites', JSON.stringify(newFavorites));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setEcosystemFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const uniqueTypes = [...new Set(allSpecies.map(s => s.type))];
  const uniqueStatuses = [...new Set(allSpecies.map(s => s.conservationStatus))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Search & Discover
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find species and ecosystems from around the world. Use filters to narrow your search.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for species, ecosystems, or habitats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 text-lg"
          />
        </div>

        <Tabs defaultValue="species" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="species">Species ({filteredSpecies.length})</TabsTrigger>
            <TabsTrigger value="ecosystems">Ecosystems ({filteredEcosystems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="species" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter species:</span>
              </div>
              
              <Select value={ecosystemFilter} onValueChange={setEcosystemFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Ecosystem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ecosystems</SelectItem>
                  {ecosystems.map(ecosystem => (
                    <SelectItem key={ecosystem.id} value={ecosystem.id}>
                      {ecosystem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
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

              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            {/* Species Results */}
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
                  No species found matching your search criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ecosystems" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEcosystems.map((ecosystem) => (
                <EcosystemCard
                  key={ecosystem.id}
                  ecosystem={ecosystem}
                  onExplore={handleExploreEcosystem}
                />
              ))}
            </div>

            {filteredEcosystems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No ecosystems found matching your search.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}