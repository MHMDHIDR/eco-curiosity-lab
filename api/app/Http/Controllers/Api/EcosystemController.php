<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ecosystem;
use Illuminate\Http\Request;

class EcosystemController extends Controller
{
    /**
     * Display a listing of ecosystems.
     */
    public function index()
    {
        $ecosystems = Ecosystem::with(['species' => function ($query) {
            $query->approved(); // Only show approved species
        }])->get();

        return response()->json([
            'data' => $ecosystems,
            'message' => 'Ecosystems retrieved successfully'
        ]);
    }

    /**
     * Display the specified ecosystem.
     */
    public function show(Ecosystem $ecosystem)
    {
        $ecosystem->load(['species' => function ($query) {
            $query->approved(); // Only show approved species
        }]);

        return response()->json([
            'data' => $ecosystem,
            'message' => 'Ecosystem retrieved successfully'
        ]);
    }

    /**
     * Store a newly created ecosystem (admin only).
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|string',
            'characteristics' => 'required|array',
        ]);

        $ecosystem = Ecosystem::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'characteristics' => $request->characteristics,
        ]);

        return response()->json([
            'data' => $ecosystem,
            'message' => 'Ecosystem created successfully'
        ], 201);
    }

    /**
     * Update the specified ecosystem (admin only).
     */
    public function update(Request $request, Ecosystem $ecosystem)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'image' => 'sometimes|string',
            'characteristics' => 'sometimes|array',
        ]);

        $ecosystem->update($request->only([
            'name', 'description', 'image', 'characteristics'
        ]));

        return response()->json([
            'data' => $ecosystem,
            'message' => 'Ecosystem updated successfully'
        ]);
    }

    /**
     * Remove the specified ecosystem (admin only).
     */
    public function destroy(Ecosystem $ecosystem)
    {
        $ecosystem->delete();

        return response()->json([
            'message' => 'Ecosystem deleted successfully'
        ]);
    }
}
