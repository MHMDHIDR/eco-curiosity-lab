export interface Species {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  habitat: string;
  diet: string;
  funFact: string;
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  type: 'mammal' | 'bird' | 'reptile' | 'amphibian' | 'fish' | 'plant' | 'insect';
  ecosystem: string;
  sound?: string;
  region?: string;
}

export interface Ecosystem {
  id: string;
  name: string;
  description: string;
  image: string;
  species: Species[];
  characteristics: string[];
}

export const ecosystems: Ecosystem[] = [
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Vast marine environments home to incredible biodiversity from coral reefs to deep sea trenches.',
    image: '/src/assets/ecosystem-ocean.jpg',
    characteristics: ['Saltwater environment', 'Diverse marine life', 'Coral reefs', 'Deep sea zones'],
    species: [
      {
        id: 'humpback-whale',
        name: 'Humpback Whale',
        scientificName: 'Megaptera novaeangliae',
        image: '/api/placeholder/400/300',
        habitat: 'Oceans worldwide, migrates between feeding and breeding grounds',
        diet: 'Krill, small schooling fish',
        funFact: 'Their songs can travel thousands of miles underwater and last up to 30 minutes!',
        conservationStatus: 'LC',
        type: 'mammal',
        ecosystem: 'ocean',
        region: 'Global'
      },
      {
        id: 'clownfish',
        name: 'Clownfish',
        scientificName: 'Amphiprioninae',
        image: '/api/placeholder/400/300',
        habitat: 'Coral reefs in warm waters',
        diet: 'Algae, zooplankton, small crustaceans',
        funFact: 'They have a symbiotic relationship with sea anemones and can change gender!',
        conservationStatus: 'LC',
        type: 'fish',
        ecosystem: 'ocean',
        region: 'Indo-Pacific'
      },
      {
        id: 'sea-turtle',
        name: 'Green Sea Turtle',
        scientificName: 'Chelonia mydas',
        image: '/api/placeholder/400/300',
        habitat: 'Tropical and subtropical coastal waters',
        diet: 'Seagrass, algae (adults), omnivorous (juveniles)',
        funFact: 'They can hold their breath for up to 5 hours and navigate using Earth\'s magnetic field!',
        conservationStatus: 'EN',
        type: 'reptile',
        ecosystem: 'ocean',
        region: 'Global tropics'
      }
    ]
  },
  {
    id: 'rainforest',
    name: 'Rainforest',
    description: 'Dense, biodiverse forests with high rainfall and incredible species richness.',
    image: '/src/assets/ecosystem-rainforest.jpg',
    characteristics: ['High biodiversity', 'Multiple canopy layers', 'Warm and humid', 'Rich soil'],
    species: [
      {
        id: 'jaguar',
        name: 'Jaguar',
        scientificName: 'Panthera onca',
        image: '/api/placeholder/400/300',
        habitat: 'Dense rainforest, wetlands',
        diet: 'Deer, tapirs, fish, caimans',
        funFact: 'They have the strongest bite force of any big cat and are excellent swimmers!',
        conservationStatus: 'NT',
        type: 'mammal',
        ecosystem: 'rainforest',
        region: 'Central & South America'
      },
      {
        id: 'toucan',
        name: 'Toco Toucan',
        scientificName: 'Ramphastos toco',
        image: '/api/placeholder/400/300',
        habitat: 'Rainforest canopy',
        diet: 'Fruits, insects, small birds, eggs',
        funFact: 'Their large beaks help regulate body temperature and can reach fruits on thin branches!',
        conservationStatus: 'LC',
        type: 'bird',
        ecosystem: 'rainforest',
        region: 'South America'
      },
      {
        id: 'poison-dart-frog',
        name: 'Poison Dart Frog',
        scientificName: 'Dendrobatidae',
        image: '/api/placeholder/400/300',
        habitat: 'Rainforest floor, near water sources',
        diet: 'Ants, termites, small insects',
        funFact: 'Their bright colors warn predators of their toxicity, which comes from their ant diet!',
        conservationStatus: 'VU',
        type: 'amphibian',
        ecosystem: 'rainforest',
        region: 'Central & South America'
      }
    ]
  },
  {
    id: 'savanna',
    name: 'Savanna',
    description: 'Grasslands with scattered trees, supporting large herbivores and their predators.',
    image: '/src/assets/ecosystem-savanna.jpg',
    characteristics: ['Grasslands', 'Scattered trees', 'Seasonal rainfall', 'Large migrations'],
    species: [
      {
        id: 'african-elephant',
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        image: '/api/placeholder/400/300',
        habitat: 'Savannas, grasslands, forests',
        diet: 'Grasses, fruits, bark, roots',
        funFact: 'They can communicate through infrasonic calls that travel for miles and have excellent memories!',
        conservationStatus: 'EN',
        type: 'mammal',
        ecosystem: 'savanna',
        region: 'Africa'
      },
      {
        id: 'giraffe',
        name: 'Giraffe',
        scientificName: 'Giraffa camelopardalis',
        image: '/api/placeholder/400/300',
        habitat: 'Savannas, grasslands, open woodlands',
        diet: 'Acacia leaves, other tree foliage',
        funFact: 'Their 18-inch tongues are dark-colored to prevent sunburn while feeding!',
        conservationStatus: 'VU',
        type: 'mammal',
        ecosystem: 'savanna',
        region: 'Africa'
      }
    ]
  },
  {
    id: 'desert',
    name: 'Desert',
    description: 'Arid environments where life has adapted to extreme heat and water scarcity.',
    image: '/src/assets/ecosystem-desert.jpg',
    characteristics: ['Low rainfall', 'Extreme temperatures', 'Specialized adaptations', 'Sparse vegetation'],
    species: [
      {
        id: 'fennec-fox',
        name: 'Fennec Fox',
        scientificName: 'Vulpes zerda',
        image: '/api/placeholder/400/300',
        habitat: 'Sandy deserts, dunes',
        diet: 'Insects, small mammals, birds, eggs',
        funFact: 'Their huge ears help them hear prey underground and release heat to keep cool!',
        conservationStatus: 'LC',
        type: 'mammal',
        ecosystem: 'desert',
        region: 'North Africa'
      }
    ]
  },
  {
    id: 'arctic',
    name: 'Arctic Tundra',
    description: 'Cold, treeless regions with permafrost, home to specially adapted wildlife.',
    image: '/src/assets/ecosystem-arctic.jpg',
    characteristics: ['Permafrost', 'Extreme cold', 'Low biodiversity', 'Seasonal changes'],
    species: [
      {
        id: 'polar-bear',
        name: 'Polar Bear',
        scientificName: 'Ursus maritimus',
        image: '/api/placeholder/400/300',
        habitat: 'Arctic sea ice, coastal areas',
        diet: 'Seals, fish, seabirds',
        funFact: 'Their fur appears white but is actually translucent, and their skin is black!',
        conservationStatus: 'VU',
        type: 'mammal',
        ecosystem: 'arctic',
        region: 'Arctic Circle'
      }
    ]
  },
  {
    id: 'forest',
    name: 'Temperate Forest',
    description: 'Deciduous and coniferous forests with distinct seasons and diverse wildlife.',
    image: '/src/assets/ecosystem-forest.jpg',
    characteristics: ['Seasonal changes', 'Deciduous trees', 'Moderate rainfall', 'Layered structure'],
    species: [
      {
        id: 'brown-bear',
        name: 'Brown Bear',
        scientificName: 'Ursus arctos',
        image: '/api/placeholder/400/300',
        habitat: 'Forests, mountains, tundra',
        diet: 'Fish, berries, nuts, small mammals',
        funFact: 'They can run up to 35 mph and have an incredible sense of smell - 7 times better than a bloodhound!',
        conservationStatus: 'LC',
        type: 'mammal',
        ecosystem: 'forest',
        region: 'North America, Europe, Asia'
      }
    ]
  }
];

export const conservationStatusLabels = {
  LC: 'Least Concern',
  NT: 'Near Threatened',
  VU: 'Vulnerable',
  EN: 'Endangered',
  CR: 'Critically Endangered'
};

export const getAllSpecies = (): Species[] => {
  return ecosystems.flatMap(ecosystem => ecosystem.species);
};

export const getSpeciesByEcosystem = (ecosystemId: string): Species[] => {
  const ecosystem = ecosystems.find(e => e.id === ecosystemId);
  return ecosystem ? ecosystem.species : [];
};

export const getSpeciesById = (speciesId: string): Species | undefined => {
  return getAllSpecies().find(species => species.id === speciesId);
};