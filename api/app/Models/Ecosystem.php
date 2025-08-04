<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ecosystem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'characteristics',
        'slug',
    ];

    protected $casts = [
        'characteristics' => 'array',
    ];

    /**
     * Get the species that belong to this ecosystem.
     */
    public function species()
    {
        return $this->hasMany(Species::class);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($ecosystem) {
            if (!$ecosystem->slug) {
                $ecosystem->slug = \Str::slug($ecosystem->name);
            }
        });
    }
}
