<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Species;
use App\Models\Ecosystem;
use Illuminate\Http\Request;

class SpeciesController extends Controller
{
    /**
     * Display a listing of approved species.
     */
    public function index(Request $request)
    {
        $query = Species::approved()->with('ecosystem');

        // Filter by ecosystem if provided
        if ($request->has('ecosystem')) {
            $query->where('ecosystem', $request->ecosystem);
        }

        // Filter by type if provided
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by conservation status if provided
        if ($request->has('conservation_status')) {
            $query->where('conservation_status', $request->conservation_status);
        }

        $species = $query->get();

        return response()->json([
            'data' => $species,
            'message' => 'Species retrieved successfully'
        ]);
    }

    /**
     * Display the specified species.
     */
    public function show(Species $species)
    {
        // Only show approved species or user's own species
        if (!$species->is_approved && (!auth()->check() || $species->user_id !== auth()->id())) {
            return response()->json(['message' => 'Species not found'], 404);
        }

        $species->load('ecosystem', 'user');

        return response()->json([
            'data' => $species,
            'message' => 'Species retrieved successfully'
        ]);
    }

    /**
     * Store a newly created species (user contribution).
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'scientific_name' => 'required|string|max:255',
            'image' => 'required|string',
            'habitat' => 'required|string',
            'diet' => 'required|string',
            'fun_fact' => 'required|string',
            'conservation_status' => 'required|in:LC,NT,VU,EN,CR',
            'type' => 'required|in:mammal,bird,reptile,amphibian,fish,plant,insect',
            'ecosystem_id' => 'required|exists:ecosystems,id',
            'region' => 'nullable|string',
            'sound' => 'nullable|string',
        ]);

        $ecosystem = Ecosystem::find($request->ecosystem_id);

        $species = Species::create([
            'name' => $request->name,
            'scientific_name' => $request->scientific_name,
            'image' => $request->image,
            'habitat' => $request->habitat,
            'diet' => $request->diet,
            'fun_fact' => $request->fun_fact,
            'conservation_status' => $request->conservation_status,
            'type' => $request->type,
            'ecosystem' => $ecosystem->name,
            'ecosystem_id' => $request->ecosystem_id,
            'region' => $request->region,
            'sound' => $request->sound,
            'user_id' => auth()->id(),
            'is_approved' => false, // User contributions need approval
        ]);

        return response()->json([
            'data' => $species,
            'message' => 'Species submitted for review successfully'
        ], 201);
    }

    /**
     * Update the specified species.
     */
    public function update(Request $request, Species $species)
    {
        // Only allow users to update their own unapproved species
        if ($species->is_approved || $species->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'scientific_name' => 'sometimes|string|max:255',
            'image' => 'sometimes|string',
            'habitat' => 'sometimes|string',
            'diet' => 'sometimes|string',
            'fun_fact' => 'sometimes|string',
            'conservation_status' => 'sometimes|in:LC,NT,VU,EN,CR',
            'type' => 'sometimes|in:mammal,bird,reptile,amphibian,fish,plant,insect',
            'ecosystem_id' => 'sometimes|exists:ecosystems,id',
            'region' => 'nullable|string',
            'sound' => 'nullable|string',
        ]);

        if ($request->has('ecosystem_id')) {
            $ecosystem = Ecosystem::find($request->ecosystem_id);
            $species->ecosystem = $ecosystem->name;
        }

        $species->update($request->except('ecosystem_id'));

        return response()->json([
            'data' => $species,
            'message' => 'Species updated successfully'
        ]);
    }

    /**
     * Remove the specified species.
     */
    public function destroy(Species $species)
    {
        // Only allow users to delete their own unapproved species
        if ($species->is_approved || $species->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $species->delete();

        return response()->json([
            'message' => 'Species deleted successfully'
        ]);
    }

    /**
     * Search species by name, scientific name, or habitat.
     */
    public function search(Request $request)
    {
        $query = $request->get('q');

        if (!$query) {
            return response()->json([
                'data' => [],
                'message' => 'No search query provided'
            ]);
        }

        $species = Species::approved()
            ->with('ecosystem')
            ->where(function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%")
                  ->orWhere('scientific_name', 'LIKE', "%{$query}%")
                  ->orWhere('habitat', 'LIKE', "%{$query}%")
                  ->orWhere('type', 'LIKE', "%{$query}%");
            })
            ->get();

        return response()->json([
            'data' => $species,
            'message' => 'Search completed successfully'
        ]);
    }

    /**
     * Get pending species for admin review.
     */
    public function pending()
    {
        $species = Species::pending()->with('ecosystem', 'user')->get();

        return response()->json([
            'data' => $species,
            'message' => 'Pending species retrieved successfully'
        ]);
    }

    /**
     * Approve a species.
     */
    public function approve(Species $species)
    {
        $species->update(['is_approved' => true]);

        return response()->json([
            'data' => $species,
            'message' => 'Species approved successfully'
        ]);
    }
}
