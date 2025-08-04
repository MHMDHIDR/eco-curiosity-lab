-- Eco Curiosity Lab Database Export
-- Generated on: 2025-08-04 17:22:51
-- Laravel API Production Database Setup

SET FOREIGN_KEY_CHECKS=0;

-- Create Tables First
-- Users Table (for authentication)
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Personal Access Tokens Table (for Sanctum)
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cache Table
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cache Locks Table
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions Table
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Jobs Table
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job Batches Table
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Failed Jobs Table
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ecosystems Table
CREATE TABLE IF NOT EXISTS `ecosystems` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `characteristics` json NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ecosystems_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Species Table
CREATE TABLE IF NOT EXISTS `species` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scientific_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `habitat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `diet` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fun_fact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `conservation_status` enum('LC','NT','VU','EN','CR') COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('mammal','bird','reptile','amphibian','fish','plant','insect') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ecosystem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sound` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ecosystem_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `species_slug_unique` (`slug`),
  KEY `species_ecosystem_id_foreign` (`ecosystem_id`),
  KEY `species_user_id_foreign` (`user_id`),
  CONSTRAINT `species_ecosystem_id_foreign` FOREIGN KEY (`ecosystem_id`) REFERENCES `ecosystems` (`id`) ON DELETE CASCADE,
  CONSTRAINT `species_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contributions Table
CREATE TABLE IF NOT EXISTS `contributions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'observation',
  `data` json DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `approved_by` bigint unsigned DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contributions_user_id_foreign` (`user_id`),
  KEY `contributions_approved_by_foreign` (`approved_by`),
  CONSTRAINT `contributions_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contributions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Data
-- Ecosystems Data
INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES
(1, 'Ocean', 'Vast marine environments home to incredible biodiversity from coral reefs to deep sea trenches.', '/assets/ecosystem-ocean.jpg', '["Saltwater environment","Diverse marine life","Coral reefs","Deep sea zones"]', 'ocean', '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(2, 'Rainforest', 'Dense, biodiverse forests with high rainfall and incredible species richness.', '/assets/ecosystem-rainforest.jpg', '["High biodiversity","Multiple canopy layers","Warm and humid","Rich soil"]', 'rainforest', '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(3, 'Savanna', 'Grasslands with scattered trees, supporting large herbivores and their predators.', '/assets/ecosystem-savanna.jpg', '["Grasslands","Scattered trees","Seasonal rainfall","Large migrations"]', 'savanna', '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(4, 'Desert', 'Arid environments where life has adapted to extreme heat and water scarcity.', '/assets/ecosystem-desert.jpg', '["Low rainfall","Extreme temperatures","Specialized adaptations","Sparse vegetation"]', 'desert', '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(5, 'Arctic Tundra', 'Cold, treeless regions with permafrost, home to specially adapted wildlife.', '/assets/ecosystem-arctic.jpg', '["Permafrost","Extreme cold","Low biodiversity","Seasonal changes"]', 'arctic', '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(6, 'Temperate Forest', 'Deciduous and coniferous forests with distinct seasons and diverse wildlife.', '/assets/ecosystem-forest.jpg', '["Seasonal changes","Deciduous trees","Moderate rainfall","Layered structure"]', 'forest', '2025-08-04 17:01:25', '2025-08-04 17:01:25');

-- Species Data
INSERT INTO species (id, name, scientific_name, image, habitat, diet, fun_fact, conservation_status, type, ecosystem, sound, region, slug, ecosystem_id, user_id, is_approved, created_at, updated_at) VALUES
(1, 'Humpback Whale', 'Megaptera novaeangliae', '/api/placeholder/400/300', 'Oceans worldwide, migrates between feeding and breeding grounds', 'Krill, small schooling fish', 'Their songs can travel thousands of miles underwater and last up to 30 minutes!', 'LC', 'mammal', 'ocean', NULL, 'Global', 'humpback-whale', 1, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(2, 'Clownfish', 'Amphiprioninae', '/api/placeholder/400/300', 'Coral reefs in warm waters', 'Algae, zooplankton, small crustaceans', 'They have a symbiotic relationship with sea anemones and can change gender!', 'LC', 'fish', 'ocean', NULL, 'Indo-Pacific', 'clownfish', 1, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(3, 'Green Sea Turtle', 'Chelonia mydas', '/api/placeholder/400/300', 'Tropical and subtropical coastal waters', 'Seagrass, algae (adults), omnivorous (juveniles)', 'They can hold their breath for up to 5 hours and navigate using Earth\'s magnetic field!', 'EN', 'reptile', 'ocean', NULL, 'Global tropics', 'sea-turtle', 1, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(4, 'Jaguar', 'Panthera onca', '/api/placeholder/400/300', 'Dense rainforest, wetlands', 'Deer, tapirs, fish, caimans', 'They have the strongest bite force of any big cat and are excellent swimmers!', 'NT', 'mammal', 'rainforest', NULL, 'Central & South America', 'jaguar', 2, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(5, 'Toco Toucan', 'Ramphastos toco', '/api/placeholder/400/300', 'Rainforest canopy', 'Fruits, insects, small birds, eggs', 'Their large beaks help regulate body temperature and can reach fruits on thin branches!', 'LC', 'bird', 'rainforest', NULL, 'South America', 'toucan', 2, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(6, 'Poison Dart Frog', 'Dendrobatidae', '/api/placeholder/400/300', 'Rainforest floor, near water sources', 'Ants, termites, small insects', 'Their bright colors warn predators of their toxicity, which comes from their ant diet!', 'VU', 'amphibian', 'rainforest', NULL, 'Central & South America', 'poison-dart-frog', 2, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(7, 'African Elephant', 'Loxodonta africana', '/api/placeholder/400/300', 'Savannas, grasslands, forests', 'Grasses, fruits, bark, roots', 'They can communicate through infrasonic calls that travel for miles and have excellent memories!', 'EN', 'mammal', 'savanna', NULL, 'Africa', 'african-elephant', 3, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(8, 'Giraffe', 'Giraffa camelopardalis', '/api/placeholder/400/300', 'Savannas, grasslands, open woodlands', 'Acacia leaves, other tree foliage', 'Their 18-inch tongues are dark-colored to prevent sunburn while feeding!', 'VU', 'mammal', 'savanna', NULL, 'Africa', 'giraffe', 3, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(9, 'Fennec Fox', 'Vulpes zerda', '/api/placeholder/400/300', 'Sandy deserts, dunes', 'Insects, small mammals, birds, eggs', 'Their huge ears help them hear prey underground and release heat to keep cool!', 'LC', 'mammal', 'desert', NULL, 'North Africa', 'fennec-fox', 4, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(10, 'Polar Bear', 'Ursus maritimus', '/api/placeholder/400/300', 'Arctic sea ice, coastal areas', 'Seals, fish, seabirds', 'Their fur appears white but is actually translucent, and their skin is black!', 'VU', 'mammal', 'arctic', NULL, 'Arctic Circle', 'polar-bear', 5, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25'),
(11, 'Brown Bear', 'Ursus arctos', '/api/placeholder/400/300', 'Forests, mountains, tundra', 'Fish, berries, nuts, small mammals', 'They can run up to 35 mph and have an incredible sense of smell - 7 times better than a bloodhound!', 'LC', 'mammal', 'forest', NULL, 'North America, Europe, Asia', 'brown-bear', 6, NULL, 1, '2025-08-04 17:01:25', '2025-08-04 17:01:25');

SET FOREIGN_KEY_CHECKS=1;

-- Export completed successfully!
-- Total Ecosystems: 6
-- Total Species: 11
