<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ecosystem;
use App\Models\Species;

class EcosystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create ecosystems and their species
        $ecosystemsData = [
            [
                'name' => 'Ocean',
                'slug' => 'ocean',
                'description' => 'Vast marine environments home to incredible biodiversity from coral reefs to deep sea trenches.',
                'image' => '/assets/ecosystem-ocean.jpg',
                'characteristics' => [
                    'Saltwater environment',
                    'Diverse marine life',
                    'Coral reefs',
                    'Deep sea zones',
                ],
                'species' => [
                    [
                        'name' => 'Humpback Whale',
                        'slug' => 'humpback-whale',
                        'scientific_name' => 'Megaptera novaeangliae',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Oceans worldwide, migrates between feeding and breeding grounds',
                        'diet' => 'Krill, small schooling fish',
                        'fun_fact' => 'Their songs can travel thousands of miles underwater and last up to 30 minutes!',
                        'conservation_status' => 'LC',
                        'type' => 'mammal',
                        'ecosystem' => 'ocean',
                        'region' => 'Global',
                    ],
                    [
                        'name' => 'Clownfish',
                        'slug' => 'clownfish',
                        'scientific_name' => 'Amphiprioninae',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Coral reefs in warm waters',
                        'diet' => 'Algae, zooplankton, small crustaceans',
                        'fun_fact' => 'They have a symbiotic relationship with sea anemones and can change gender!',
                        'conservation_status' => 'LC',
                        'type' => 'fish',
                        'ecosystem' => 'ocean',
                        'region' => 'Indo-Pacific',
                    ],
                    [
                        'name' => 'Green Sea Turtle',
                        'slug' => 'sea-turtle',
                        'scientific_name' => 'Chelonia mydas',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Tropical and subtropical coastal waters',
                        'diet' => 'Seagrass, algae (adults), omnivorous (juveniles)',
                        'fun_fact' => "They can hold their breath for up to 5 hours and navigate using Earth's magnetic field!",
                        'conservation_status' => 'EN',
                        'type' => 'reptile',
                        'ecosystem' => 'ocean',
                        'region' => 'Global tropics',
                    ],
                ],
            ],
            [
                'name' => 'Rainforest',
                'slug' => 'rainforest',
                'description' => 'Dense, biodiverse forests with high rainfall and incredible species richness.',
                'image' => '/assets/ecosystem-rainforest.jpg',
                'characteristics' => [
                    'High biodiversity',
                    'Multiple canopy layers',
                    'Warm and humid',
                    'Rich soil',
                ],
                'species' => [
                    [
                        'name' => 'Jaguar',
                        'slug' => 'jaguar',
                        'scientific_name' => 'Panthera onca',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Dense rainforest, wetlands',
                        'diet' => 'Deer, tapirs, fish, caimans',
                        'fun_fact' => 'They have the strongest bite force of any big cat and are excellent swimmers!',
                        'conservation_status' => 'NT',
                        'type' => 'mammal',
                        'ecosystem' => 'rainforest',
                        'region' => 'Central & South America',
                    ],
                    [
                        'name' => 'Toco Toucan',
                        'slug' => 'toucan',
                        'scientific_name' => 'Ramphastos toco',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Rainforest canopy',
                        'diet' => 'Fruits, insects, small birds, eggs',
                        'fun_fact' => 'Their large beaks help regulate body temperature and can reach fruits on thin branches!',
                        'conservation_status' => 'LC',
                        'type' => 'bird',
                        'ecosystem' => 'rainforest',
                        'region' => 'South America',
                    ],
                    [
                        'name' => 'Poison Dart Frog',
                        'slug' => 'poison-dart-frog',
                        'scientific_name' => 'Dendrobatidae',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Rainforest floor, near water sources',
                        'diet' => 'Ants, termites, small insects',
                        'fun_fact' => 'Their bright colors warn predators of their toxicity, which comes from their ant diet!',
                        'conservation_status' => 'VU',
                        'type' => 'amphibian',
                        'ecosystem' => 'rainforest',
                        'region' => 'Central & South America',
                    ],
                ],
            ],
            [
                'name' => 'Savanna',
                'slug' => 'savanna',
                'description' => 'Grasslands with scattered trees, supporting large herbivores and their predators.',
                'image' => '/assets/ecosystem-savanna.jpg',
                'characteristics' => [
                    'Grasslands',
                    'Scattered trees',
                    'Seasonal rainfall',
                    'Large migrations',
                ],
                'species' => [
                    [
                        'name' => 'African Elephant',
                        'slug' => 'african-elephant',
                        'scientific_name' => 'Loxodonta africana',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Savannas, grasslands, forests',
                        'diet' => 'Grasses, fruits, bark, roots',
                        'fun_fact' => 'They can communicate through infrasonic calls that travel for miles and have excellent memories!',
                        'conservation_status' => 'EN',
                        'type' => 'mammal',
                        'ecosystem' => 'savanna',
                        'region' => 'Africa',
                    ],
                    [
                        'name' => 'Giraffe',
                        'slug' => 'giraffe',
                        'scientific_name' => 'Giraffa camelopardalis',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Savannas, grasslands, open woodlands',
                        'diet' => 'Acacia leaves, other tree foliage',
                        'fun_fact' => 'Their 18-inch tongues are dark-colored to prevent sunburn while feeding!',
                        'conservation_status' => 'VU',
                        'type' => 'mammal',
                        'ecosystem' => 'savanna',
                        'region' => 'Africa',
                    ],
                ],
            ],
            [
                'name' => 'Desert',
                'slug' => 'desert',
                'description' => 'Arid environments where life has adapted to extreme heat and water scarcity.',
                'image' => '/assets/ecosystem-desert.jpg',
                'characteristics' => [
                    'Low rainfall',
                    'Extreme temperatures',
                    'Specialized adaptations',
                    'Sparse vegetation',
                ],
                'species' => [
                    [
                        'name' => 'Fennec Fox',
                        'slug' => 'fennec-fox',
                        'scientific_name' => 'Vulpes zerda',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Sandy deserts, dunes',
                        'diet' => 'Insects, small mammals, birds, eggs',
                        'fun_fact' => 'Their huge ears help them hear prey underground and release heat to keep cool!',
                        'conservation_status' => 'LC',
                        'type' => 'mammal',
                        'ecosystem' => 'desert',
                        'region' => 'North Africa',
                    ],
                ],
            ],
            [
                'name' => 'Arctic Tundra',
                'slug' => 'arctic',
                'description' => 'Cold, treeless regions with permafrost, home to specially adapted wildlife.',
                'image' => '/assets/ecosystem-arctic.jpg',
                'characteristics' => [
                    'Permafrost',
                    'Extreme cold',
                    'Low biodiversity',
                    'Seasonal changes',
                ],
                'species' => [
                    [
                        'name' => 'Polar Bear',
                        'slug' => 'polar-bear',
                        'scientific_name' => 'Ursus maritimus',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Arctic sea ice, coastal areas',
                        'diet' => 'Seals, fish, seabirds',
                        'fun_fact' => 'Their fur appears white but is actually translucent, and their skin is black!',
                        'conservation_status' => 'VU',
                        'type' => 'mammal',
                        'ecosystem' => 'arctic',
                        'region' => 'Arctic Circle',
                    ],
                ],
            ],
            [
                'name' => 'Temperate Forest',
                'slug' => 'forest',
                'description' => 'Deciduous and coniferous forests with distinct seasons and diverse wildlife.',
                'image' => '/assets/ecosystem-forest.jpg',
                'characteristics' => [
                    'Seasonal changes',
                    'Deciduous trees',
                    'Moderate rainfall',
                    'Layered structure',
                ],
                'species' => [
                    [
                        'name' => 'Brown Bear',
                        'slug' => 'brown-bear',
                        'scientific_name' => 'Ursus arctos',
                        'image' => '/api/placeholder/400/300',
                        'habitat' => 'Forests, mountains, tundra',
                        'diet' => 'Fish, berries, nuts, small mammals',
                        'fun_fact' => 'They can run up to 35 mph and have an incredible sense of smell - 7 times better than a bloodhound!',
                        'conservation_status' => 'LC',
                        'type' => 'mammal',
                        'ecosystem' => 'forest',
                        'region' => 'North America, Europe, Asia',
                    ],
                ],
            ],
        ];

        foreach ($ecosystemsData as $ecosystemData) {
            $species = $ecosystemData['species'];
            unset($ecosystemData['species']);

            $ecosystem = Ecosystem::create($ecosystemData);

            foreach ($species as $speciesData) {
                $speciesData['ecosystem_id'] = $ecosystem->id;
                Species::create($speciesData);
            }
        }
    }
}
