# 🚀 Laravel API Deployment Guide - Hostinger

## Prerequisites

Before deploying to `api.ecocuriositylab.me`, ensure you have:

- Hostinger hosting account with PHP 8.1+ support
- MySQL database access
- FTP/SFTP access or File Manager access
- SSL certificate for your subdomain (Hostinger provides free SSL)

## Step 1: Prepare Laravel for Production

### 1.1 Optimize Dependencies

```bash
cd api
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 1.2 Create Production Environment File

Create `.env` file on your server with these settings:

```env
APP_NAME="Eco Curiosity Lab API"
APP_ENV=production
APP_KEY=base64:9UhhmyAYF/uoGB5oz9W1j5oxqN6mX7MYkfCsFFDB7MI=
APP_DEBUG=false
APP_URL=https://api.ecocuriositylab.me

APP_LOCALE=en
APP_FALLBACK_LOCALE=en

LOG_CHANNEL=stack
LOG_LEVEL=error

# Database - Update with your Hostinger MySQL details
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_hostinger_database_name
DB_USERNAME=your_hostinger_db_username
DB_PASSWORD=your_hostinger_db_password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=.ecocuriositylab.me

CACHE_STORE=database
QUEUE_CONNECTION=database

# Email Configuration (Hostinger SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=your_email@ecocuriositylab.me
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@ecocuriositylab.me"
MAIL_FROM_NAME="Eco Curiosity Lab"

# CORS for Frontend Integration
FRONTEND_URL=https://ecocuriositylab.me
SANCTUM_STATEFUL_DOMAINS=ecocuriositylab.me,api.ecocuriositylab.me
SESSION_DOMAIN=.ecocuriositylab.me
```

## Step 2: Set Up Database on Hostinger

### 2.1 Create MySQL Database

1. Log into your Hostinger control panel (hPanel)
2. Go to **MySQL Databases**
3. Create a new database (e.g., `eco_curiosity_lab`)
4. Create a database user with full privileges
5. Note down the database name, username, and password

### 2.2 Configure Database Connection

Update your `.env` file with the database credentials from Step 2.1.

## Step 3: Upload Files to Hostinger

### Option A: Using File Manager (Recommended for beginners)

1. **Zip your Laravel project** (exclude `node_modules`, `.git`, `vendor` if uploading)
2. **Upload to public_html/api/** (or create subdomain folder)
3. **Extract the files**
4. **Set correct permissions:**
   - Storage folder: 775
   - Bootstrap/cache folder: 775
   - .env file: 644

### Option B: Using FTP/SFTP

1. **Connect via FTP/SFTP** to your Hostinger account
2. **Upload files** to the subdomain directory
3. **Set permissions** as mentioned above

## Step 4: Configure Web Server

### 4.1 Create .htaccess for Subdomain

Create `.htaccess` in your subdomain root directory:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Handle Angular and react Router
    RewriteBase /

    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # Laravel API Routes
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.*)$ public/index.php [QSA,L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# CORS Headers for API
<IfModule mod_headers.c>
    Header add Access-Control-Allow-Origin "https://ecocuriositylab.me"
    Header add Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE, PATCH"
    Header add Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
    Header add Access-Control-Allow-Credentials "true"
</IfModule>
```

### 4.2 Set Document Root

If using subdomain, ensure the document root points to your Laravel's `public` folder:

- **Subdomain document root**: `/public_html/api/public/` (or similar path)

## Step 5: Install Dependencies on Server

### Via Composer (if available on server)

```bash
cd /path/to/your/laravel/app
composer install --optimize-autoloader --no-dev
```

### Manual Upload (if Composer not available)

1. Run `composer install --optimize-autoloader --no-dev` locally
2. Upload the entire `vendor` folder to your server

## Step 6: Run Database Migrations

### Using Artisan (if CLI available)

```bash
php artisan migrate --force
php artisan db:seed --force
```

### Manual Database Setup (if CLI not available)

1. **Export your local database:**

   ```bash
   cd api
   php artisan migrate:fresh --seed
   # Then export the SQLite database to SQL format
   ```

2. **Import via phpMyAdmin** or Hostinger's database manager

## Step 7: Optimize for Production

### 7.1 Cache Configuration

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 7.2 Set Permissions

```bash
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/
chmod 644 .env
```

## Step 8: SSL Configuration

1. **Enable SSL** in Hostinger control panel for `api.ecocuriositylab.me`
2. **Force HTTPS** (already included in .htaccess above)
3. **Update APP_URL** in .env to use `https://`

## Step 9: Test Your Deployment

### 9.1 Test API Endpoints

```bash
# Test basic endpoint
curl https://api.ecocuriositylab.me/api/ecosystems

# Test with proper headers
curl -H "Accept: application/json" https://api.ecocuriositylab.me/api/ecosystems
```

### 9.2 Check Laravel Logs

Monitor `/storage/logs/laravel.log` for any errors.

## Step 10: Update Frontend Configuration

Update your frontend API configuration to use the production URL:

```typescript
// src/lib/api.ts
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.ecocuriositylab.me/api'
    : 'http://localhost:8000/api'
```

## Common Issues & Solutions

### Issue: 500 Internal Server Error

**Solutions:**

- Check file permissions (755 for directories, 644 for files)
- Verify .env file configuration
- Check error logs in `/storage/logs/`
- Ensure all required PHP extensions are installed

### Issue: Database Connection Error

**Solutions:**

- Verify database credentials in .env
- Check if database exists
- Ensure database user has proper privileges
- Test connection using a simple PHP script

### Issue: CORS Errors

**Solutions:**

- Verify SANCTUM_STATEFUL_DOMAINS in .env
- Check .htaccess CORS headers
- Ensure cookies are enabled for cross-domain requests

### Issue: Route Not Found

**Solutions:**

- Clear route cache: `php artisan route:clear`
- Verify .htaccess rewrite rules
- Check if mod_rewrite is enabled

## Production Checklist

- [ ] ✅ Database created and configured
- [ ] ✅ .env file properly configured for production
- [ ] ✅ Files uploaded to correct directory
- [ ] ✅ Permissions set correctly
- [ ] ✅ SSL certificate installed and active
- [ ] ✅ Database migrations run successfully
- [ ] ✅ API endpoints responding correctly
- [ ] ✅ CORS configured for frontend domain
- [ ] ✅ Error logging enabled and monitored
- [ ] ✅ Cache optimizations applied

## Maintenance Commands

```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Recreate caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Check application status
php artisan about
```

Your Laravel API should now be live at `https://api.ecocuriositylab.me`! 🎉
