<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contribution;
use Illuminate\Http\Request;

class ContributionController extends Controller
{
    /**
     * Display a listing of all contributions (admin only).
     */
    public function index(Request $request)
    {
        $query = Contribution::with('user', 'approver');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type if provided
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $contributions = $query->latest()->get();

        return response()->json([
            'data' => $contributions,
            'message' => 'Contributions retrieved successfully'
        ]);
    }

    /**
     * Store a newly created contribution.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:observation,species_suggestion,ecosystem_finding',
            'data' => 'nullable|array',
            'image' => 'nullable|string',
            'location' => 'nullable|string',
        ]);

        $contribution = Contribution::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'data' => $request->data,
            'image' => $request->image,
            'location' => $request->location,
        ]);

        $contribution->load('user');

        return response()->json([
            'data' => $contribution,
            'message' => 'Contribution submitted successfully'
        ], 201);
    }

    /**
     * Display the specified contribution.
     */
    public function show(Contribution $contribution)
    {
        // Users can only see their own contributions unless they're admin
        if ($contribution->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $contribution->load('user', 'approver');

        return response()->json([
            'data' => $contribution,
            'message' => 'Contribution retrieved successfully'
        ]);
    }

    /**
     * Update the specified contribution.
     */
    public function update(Request $request, Contribution $contribution)
    {
        // Users can only update their own pending contributions
        if ($contribution->user_id !== auth()->id() || $contribution->status !== 'pending') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|in:observation,species_suggestion,ecosystem_finding',
            'data' => 'nullable|array',
            'image' => 'nullable|string',
            'location' => 'nullable|string',
        ]);

        $contribution->update($request->only([
            'title', 'description', 'type', 'data', 'image', 'location'
        ]));

        return response()->json([
            'data' => $contribution,
            'message' => 'Contribution updated successfully'
        ]);
    }

    /**
     * Remove the specified contribution.
     */
    public function destroy(Contribution $contribution)
    {
        // Users can only delete their own pending contributions
        if ($contribution->user_id !== auth()->id() || $contribution->status !== 'pending') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $contribution->delete();

        return response()->json([
            'message' => 'Contribution deleted successfully'
        ]);
    }

    /**
     * Get current user's contributions.
     */
    public function myContributions(Request $request)
    {
        $query = auth()->user()->contributions();

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $contributions = $query->latest()->get();

        return response()->json([
            'data' => $contributions,
            'message' => 'Your contributions retrieved successfully'
        ]);
    }

    /**
     * Approve a contribution (admin only).
     */
    public function approve(Contribution $contribution)
    {
        $contribution->approve();

        return response()->json([
            'data' => $contribution,
            'message' => 'Contribution approved successfully'
        ]);
    }

    /**
     * Reject a contribution (admin only).
     */
    public function reject(Request $request, Contribution $contribution)
    {
        $request->validate([
            'admin_notes' => 'nullable|string',
        ]);

        $contribution->reject($request->admin_notes);

        return response()->json([
            'data' => $contribution,
            'message' => 'Contribution rejected'
        ]);
    }
}
