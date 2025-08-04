<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'scientific_name',
        'image',
        'habitat',
        'diet',
        'fun_fact',
        'conservation_status',
        'type',
        'ecosystem',
        'sound',
        'region',
        'slug',
        'ecosystem_id',
        'user_id',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    /**
     * Get the ecosystem that owns this species.
     */
    public function ecosystem()
    {
        return $this->belongsTo(Ecosystem::class);
    }

    /**
     * Get the user who contributed this species.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include approved species.
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    /**
     * Scope a query to only include pending species.
     */
    public function scopePending($query)
    {
        return $query->where('is_approved', false);
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

        static::creating(function ($species) {
            if (!$species->slug) {
                $species->slug = \Str::slug($species->name);
            }
        });
    }
}
