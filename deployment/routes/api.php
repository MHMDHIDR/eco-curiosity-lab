<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EcosystemController;
use App\Http\Controllers\Api\SpeciesController;
use App\Http\Controllers\Api\ContributionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

// Public API routes (no authentication required)
Route::apiResource('ecosystems', EcosystemController::class)->only(['index', 'show']);
Route::apiResource('species', SpeciesController::class)->only(['index', 'show']);

// Search route
Route::get('/search', [SpeciesController::class, 'search']);

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    // User contributions
    Route::apiResource('contributions', ContributionController::class);

    // User can suggest new species
    Route::post('/species', [SpeciesController::class, 'store']);

    // User can get their own contributions
    Route::get('/my-contributions', [ContributionController::class, 'myContributions']);

    // Admin routes (you can add role middleware later)
    Route::prefix('admin')->group(function () {
        Route::patch('/contributions/{contribution}/approve', [ContributionController::class, 'approve']);
        Route::patch('/contributions/{contribution}/reject', [ContributionController::class, 'reject']);
        Route::get('/pending-species', [SpeciesController::class, 'pending']);
        Route::patch('/species/{species}/approve', [SpeciesController::class, 'approve']);
    });
});