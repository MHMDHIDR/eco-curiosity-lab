<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EcosystemController;
use App\Http\Controllers\Api\SpeciesController;
use App\Http\Controllers\Api\ContributionController;

// CORS Test Route
Route::get('/test', function () {
    return response()->json([
        'message' => 'CORS is working!',
        'timestamp' => now(),
        'status' => 'success'
    ]);
});

// Handle OPTIONS requests for all API routes
Route::options('{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
})->where('any', '.*');

// Public routes (no authentication required)
Route::get('/ecosystems', [EcosystemController::class, 'index']);
Route::get('/ecosystems/{ecosystem}', [EcosystemController::class, 'show']);
Route::get('/species', [SpeciesController::class, 'index']);
Route::get('/species/{species}', [SpeciesController::class, 'show']);
Route::get('/search', [SpeciesController::class, 'search']);

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/species', [SpeciesController::class, 'store']);
    Route::patch('/species/{species}', [SpeciesController::class, 'update']);
    Route::delete('/species/{species}', [SpeciesController::class, 'destroy']);

    Route::get('/contributions', [ContributionController::class, 'index']);
    Route::post('/contributions', [ContributionController::class, 'store']);
    Route::get('/contributions/{contribution}', [ContributionController::class, 'show']);
    Route::patch('/contributions/{contribution}', [ContributionController::class, 'update']);
    Route::delete('/contributions/{contribution}', [ContributionController::class, 'destroy']);
    Route::get('/my-contributions', [ContributionController::class, 'myContributions']);

    // Admin routes (for future use)
    Route::middleware('admin')->group(function () {
        Route::get('/species/pending', [SpeciesController::class, 'pending']);
        Route::patch('/species/{species}/approve', [SpeciesController::class, 'approve']);
        Route::patch('/contributions/{contribution}/approve', [ContributionController::class, 'approve']);
        Route::patch('/contributions/{contribution}/reject', [ContributionController::class, 'reject']);
    });
});