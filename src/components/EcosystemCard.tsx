import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ecosystem } from "@/data/ecosystems";

interface EcosystemCardProps {
  ecosystem: Ecosystem;
  onExplore: (ecosystemId: string) => void;
}

export function EcosystemCard({ ecosystem, onExplore }: EcosystemCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-ecosystem transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={ecosystem.image}
          alt={ecosystem.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-2">{ecosystem.name}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {ecosystem.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {ecosystem.species.length} species
          </span>
          <Button 
            variant="ecosystem" 
            size="sm" 
            onClick={() => onExplore(ecosystem.id)}
          >
            Explore
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}