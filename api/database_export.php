<?php

/**
 * Database Export Script for Production Deployment
 * This script exports your local SQLite data to MySQL-compatible SQL format
 *
 * Usage: php database_export.php > eco_curiosity_lab.sql
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use App\Models\Ecosystem;
use App\Models\Species;

echo "-- Eco Curiosity Lab Database Export\n";
echo "-- Generated on: " . date('Y-m-d H:i:s') . "\n";
echo "-- Laravel API Production Database Setup\n\n";

echo "SET FOREIGN_KEY_CHECKS=0;\n\n";

// Export Ecosystems
echo "-- Ecosystems Table\n";
echo "TRUNCATE TABLE ecosystems;\n";

$ecosystems = Ecosystem::all();
foreach ($ecosystems as $ecosystem) {
    $characteristics = addslashes(json_encode($ecosystem->characteristics));
    $created_at = $ecosystem->created_at->format('Y-m-d H:i:s');
    $updated_at = $ecosystem->updated_at->format('Y-m-d H:i:s');

    echo "INSERT INTO ecosystems (id, name, description, image, characteristics, slug, created_at, updated_at) VALUES ";
    echo "(
        {$ecosystem->id},
        '" . addslashes($ecosystem->name) . "',
        '" . addslashes($ecosystem->description) . "',
        '" . addslashes($ecosystem->image) . "',
        '{$characteristics}',
        '" . addslashes($ecosystem->slug) . "',
        '{$created_at}',
        '{$updated_at}'
    );\n";
}

echo "\n-- Species Table\n";
echo "TRUNCATE TABLE species;\n";

$species = Species::all();
foreach ($species as $specie) {
    $created_at = $specie->created_at->format('Y-m-d H:i:s');
    $updated_at = $specie->updated_at->format('Y-m-d H:i:s');
    $sound = $specie->sound ? "'" . addslashes($specie->sound) . "'" : 'NULL';
    $region = $specie->region ? "'" . addslashes($specie->region) . "'" : 'NULL';
    $user_id = $specie->user_id ?: 'NULL';

    echo "INSERT INTO species (
        id, name, scientific_name, image, habitat, diet, fun_fact,
        conservation_status, type, ecosystem, sound, region, slug,
        ecosystem_id, user_id, is_approved, created_at, updated_at
    ) VALUES ";
    echo "(
        {$specie->id},
        '" . addslashes($specie->name) . "',
        '" . addslashes($specie->scientific_name) . "',
        '" . addslashes($specie->image) . "',
        '" . addslashes($specie->habitat) . "',
        '" . addslashes($specie->diet) . "',
        '" . addslashes($specie->fun_fact) . "',
        '" . addslashes($specie->conservation_status) . "',
        '" . addslashes($specie->type) . "',
        '" . addslashes($specie->ecosystem) . "',
        {$sound},
        {$region},
        '" . addslashes($specie->slug) . "',
        {$specie->ecosystem_id},
        {$user_id},
        " . ($specie->is_approved ? '1' : '0') . ",
        '{$created_at}',
        '{$updated_at}'
    );\n";
}

echo "\nSET FOREIGN_KEY_CHECKS=1;\n";
echo "\n-- Export completed successfully!\n";
echo "-- Total Ecosystems: " . $ecosystems->count() . "\n";
echo "-- Total Species: " . $species->count() . "\n";