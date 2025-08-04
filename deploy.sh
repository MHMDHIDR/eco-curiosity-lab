#!/bin/bash

# Eco Curiosity Lab - Laravel API Deployment Script
# This script prepares your Laravel app for production deployment on Hostinger

echo "🚀 Preparing Laravel API for Production Deployment..."
echo "=================================================="

# Move to API directory
cd api

echo "📦 Installing production dependencies..."
composer install --optimize-autoloader --no-dev

echo "🗄️ Generating database export..."
php database_export.php > eco_curiosity_lab.sql

echo "⚡ Optimizing Laravel for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "📁 Creating deployment package..."
cd ..

# Create deployment directory
mkdir -p deployment
cp -r api/* deployment/

# Remove development files
cd deployment
rm -rf .git
rm -rf node_modules
rm -rf tests
rm -f .env
rm -f .env.example
rm -f phpunit.xml
rm -f database_export.php

echo "✅ Deployment package ready in 'deployment' folder!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload the 'deployment' folder contents to your Hostinger subdomain"
echo "2. Create MySQL database in Hostinger control panel"
echo "3. Create .env file on server with production settings"
echo "4. Import eco_curiosity_lab.sql to your MySQL database"
echo "5. Set file permissions (755 for folders, 644 for files)"
echo "6. Test your API at https://api.ecocuriositylab.me/api/ecosystems"
echo ""
echo "🎉 Ready for deployment!"