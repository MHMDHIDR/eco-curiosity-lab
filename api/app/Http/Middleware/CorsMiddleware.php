<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', $this->getAllowedOrigin($request))
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-TOKEN')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Max-Age', '3600');
        }

        // Process the request
        $response = $next($request);

        // Add CORS headers to all responses
        return $response
            ->header('Access-Control-Allow-Origin', $this->getAllowedOrigin($request))
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-TOKEN')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Expose-Headers', 'Authorization');
    }

    /**
     * Get the allowed origin based on the request
     */
    private function getAllowedOrigin(Request $request): string
    {
        $origin = $request->header('Origin');

        $allowedOrigins = [
            'https://ecocuriositylab.me',
            'http://localhost:8080',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:8080',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
        ];

        if (in_array($origin, $allowedOrigins)) {
            return $origin;
        }

        // Default to the first allowed origin (production)
        return 'https://ecocuriositylab.me';
    }
}
