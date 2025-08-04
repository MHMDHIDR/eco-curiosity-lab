<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('species', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('scientific_name');
            $table->string('image');
            $table->text('habitat');
            $table->text('diet');
            $table->text('fun_fact');
            $table->enum('conservation_status', ['LC', 'NT', 'VU', 'EN', 'CR']);
            $table->enum('type', ['mammal', 'bird', 'reptile', 'amphibian', 'fish', 'plant', 'insect']);
            $table->string('ecosystem');
            $table->string('sound')->nullable();
            $table->string('region')->nullable();
            $table->string('slug')->unique();
            $table->foreignId('ecosystem_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // For user contributions
            $table->boolean('is_approved')->default(true); // For user-contributed species
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species');
    }
};
