-- Eco Curiosity Lab Database Export
-- Generated on: 2025-08-04 17:22:51
-- Laravel API Production Database Setup

SET FOREIGN_KEY_CHECKS=0;

-- Ecosystems Table
TRUNCATE TABLE ecosystems;
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES (
        1,
        'Ocean',
        'Vast marine environments home to incredible biodiversity from coral reefs to deep sea trenches.',
        '/assets/ecosystem-ocean.jpg',
        '[\"Saltwater environment\",\"Diverse marine life\",\"Coral reefs\",\"Deep sea zones\"]',
        'ocean',
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES (
        2,
        'Rainforest',
        'Dense, biodiverse forests with high rainfall and incredible species richness.',
        '/assets/ecosystem-rainforest.jpg',
        '[\"High biodiversity\",\"Multiple canopy layers\",\"Warm and humid\",\"Rich soil\"]',
        'rainforest',
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES (
        3,
        'Savanna',
        'Grasslands with scattered trees, supporting large herbivores and their predators.',
        '/assets/ecosystem-savanna.jpg',
        '[\"Grasslands\",\"Scattered trees\",\"Seasonal rainfall\",\"Large migrations\"]',
        'savanna',
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES (
        4,
        'Desert',
        'Arid environments where life has adapted to extreme heat and water scarcity.',
        '/assets/ecosystem-desert.jpg',
        '[\"Low rainfall\",\"Extreme temperatures\",\"Specialized adaptations\",\"Sparse vegetation\"]',
        'desert',
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES (
        5,
        'Arctic Tundra',
        'Cold, treeless regions with permafrost, home to specially adapted wildlife.',
        '/assets/ecosystem-arctic.jpg',
        '[\"Permafrost\",\"Extreme cold\",\"Low biodiversity\",\"Seasonal changes\"]',
        'arctic',
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES (
        6,
        'Temperate Forest',
        'Deciduous and coniferous forests with distinct seasons and diverse wildlife.',
        '/assets/ecosystem-forest.jpg',
        '[\"Seasonal changes\",\"Deciduous trees\",\"Moderate rainfall\",\"Layered structure\"]',
        'forest',
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );

-- Species Table
TRUNCATE TABLE species;
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        1,
        'Humpback Whale',
        'Megaptera novaeangliae',
        '/api/placeholder/400/300',
        'Oceans worldwide, migrates between feeding and breeding grounds',
        'Krill, small schooling fish',
        'Their songs can travel thousands of miles underwater and last up to 30 minutes!',
        'LC',
        'mammal',
        'ocean',
        NULL,
        'Global',
        'humpback-whale',
        1,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        2,
        'Clownfish',
        'Amphiprioninae',
        '/api/placeholder/400/300',
        'Coral reefs in warm waters',
        'Algae, zooplankton, small crustaceans',
        'They have a symbiotic relationship with sea anemones and can change gender!',
        'LC',
        'fish',
        'ocean',
        NULL,
        'Indo-Pacific',
        'clownfish',
        1,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        3,
        'Green Sea Turtle',
        'Chelonia mydas',
        '/api/placeholder/400/300',
        'Tropical and subtropical coastal waters',
        'Seagrass, algae (adults), omnivorous (juveniles)',
        'They can hold their breath for up to 5 hours and navigate using Earth\'s magnetic field!',
        'EN',
        'reptile',
        'ocean',
        NULL,
        'Global tropics',
        'sea-turtle',
        1,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        4,
        'Jaguar',
        'Panthera onca',
        '/api/placeholder/400/300',
        'Dense rainforest, wetlands',
        'Deer, tapirs, fish, caimans',
        'They have the strongest bite force of any big cat and are excellent swimmers!',
        'NT',
        'mammal',
        'rainforest',
        NULL,
        'Central & South America',
        'jaguar',
        2,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        5,
        'Toco Toucan',
        'Ramphastos toco',
        '/api/placeholder/400/300',
        'Rainforest canopy',
        'Fruits, insects, small birds, eggs',
        'Their large beaks help regulate body temperature and can reach fruits on thin branches!',
        'LC',
        'bird',
        'rainforest',
        NULL,
        'South America',
        'toucan',
        2,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        6,
        'Poison Dart Frog',
        'Dendrobatidae',
        '/api/placeholder/400/300',
        'Rainforest floor, near water sources',
        'Ants, termites, small insects',
        'Their bright colors warn predators of their toxicity, which comes from their ant diet!',
        'VU',
        'amphibian',
        'rainforest',
        NULL,
        'Central & South America',
        'poison-dart-frog',
        2,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        7,
        'African Elephant',
        'Loxodonta africana',
        '/api/placeholder/400/300',
        'Savannas, grasslands, forests',
        'Grasses, fruits, bark, roots',
        'They can communicate through infrasonic calls that travel for miles and have excellent memories!',
        'EN',
        'mammal',
        'savanna',
        NULL,
        'Africa',
        'african-elephant',
        3,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        8,
        'Giraffe',
        'Giraffa camelopardalis',
        '/api/placeholder/400/300',
        'Savannas, grasslands, open woodlands',
        'Acacia leaves, other tree foliage',
        'Their 18-inch tongues are dark-colored to prevent sunburn while feeding!',
        'VU',
        'mammal',
        'savanna',
        NULL,
        'Africa',
        'giraffe',
        3,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        9,
        'Fennec Fox',
        'Vulpes zerda',
        '/api/placeholder/400/300',
        'Sandy deserts, dunes',
        'Insects, small mammals, birds, eggs',
        'Their huge ears help them hear prey underground and release heat to keep cool!',
        'LC',
        'mammal',
        'desert',
        NULL,
        'North Africa',
        'fennec-fox',
        4,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        10,
        'Polar Bear',
        'Ursus maritimus',
        '/api/placeholder/400/300',
        'Arctic sea ice, coastal areas',
        'Seals, fish, seabirds',
        'Their fur appears white but is actually translucent, and their skin is black!',
        'VU',
        'mammal',
        'arctic',
        NULL,
        'Arctic Circle',
        'polar-bear',
        5,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );
INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES (
        11,
        'Brown Bear',
        'Ursus arctos',
        '/api/placeholder/400/300',
        'Forests, mountains, tundra',
        'Fish, berries, nuts, small mammals',
        'They can run up to 35 mph and have an incredible sense of smell - 7 times better than a bloodhound!',
        'LC',
        'mammal',
        'forest',
        NULL,
        'North America, Europe, Asia',
        'brown-bear',
        6,
        NULL,
        1,
        '2025-08-04 17:01:25',
        '2025-08-04 17:01:25'
    );

SET FOREIGN_KEY_CHECKS=1;

-- Export completed successfully!
-- Total Ecosystems: 6
-- Total Species: 11
