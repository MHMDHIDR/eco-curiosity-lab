# 🔧 CORS Fix Deployment Guide

## 🚨 **Issue**: CORS Errors Between Frontend and Backend

Your React frontend can't connect to your Laravel API due to CORS (Cross-Origin Resource Sharing) restrictions.

## ✅ **Solution**: Updated CORS Configuration

I've created a comprehensive CORS fix that includes:

### **1. Custom CORS Middleware**

- **File**: `api/app/Http/Middleware/CorsMiddleware.php`
- **What it does**: Handles preflight OPTIONS requests and adds proper CORS headers
- **Supports**: Multiple origins (production + development)

### **2. Updated Laravel Bootstrap**

- **File**: `api/bootstrap/app.php`
- **What it does**: Registers our custom CORS middleware for all API routes

### **3. Enhanced .htaccess**

- **File**: `api/.htaccess`
- **What it does**: Handles CORS at the Apache level with proper OPTIONS support

### **4. Improved API Client**

- **File**: `src/lib/api.ts`
- **What it does**: Better error handling and debugging for CORS issues

## 📋 **Deployment Steps**

### **Step 1: Upload Updated Files to Hostinger**

Upload these files to your `api.ecocuriositylab.me` directory:

```
api/
├── app/Http/Middleware/CorsMiddleware.php  (NEW - UPLOAD)
├── bootstrap/app.php                       (UPDATED - REPLACE)
├── routes/api.php                          (UPDATED - REPLACE)
├── config/cors.php                         (NEW - UPLOAD)
└── .htaccess                               (UPDATED - REPLACE)
```

### **Step 2: Clear Laravel Cache**

Run these commands in your Hostinger file manager or SSH:

```bash
# Navigate to your API directory
cd public_html/api  # or wherever your API is located

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Rebuild caches for production
php artisan config:cache
php artisan route:cache
```

### **Step 3: Test the CORS Fix**

1. **Test API directly**: Visit `https://api.ecocuriositylab.me/api/test`

   - Should return: `{"message":"CORS is working!","timestamp":"...","status":"success"}`

2. **Test from frontend**: Visit your React app and check browser console
   - Should see successful API calls instead of CORS errors

### **Step 4: Update Frontend (If Needed)**

If you're testing locally, make sure your React dev server is running on:

- `http://localhost:5173` (Vite) or
- `http://localhost:3000` (Create React App)

## 🔍 **Debugging CORS Issues**

### **Check Browser Console**

```javascript
// Should see these logs in development:
🚀 API Request: GET /api/ecosystems
✅ API Response: 200 {data: [...]}

// Instead of:
❌ CORS Error: Access to fetch at '...' has been blocked
```

### **Check Network Tab**

1. Open DevTools → Network tab
2. Look for requests to `api.ecocuriositylab.me`
3. Check if OPTIONS preflight requests return 200 status
4. Verify response headers include `Access-Control-Allow-Origin`

### **Test API Endpoints**

```bash
# Test CORS headers directly
curl -H "Origin: https://ecocuriositylab.me" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://api.ecocuriositylab.me/api/ecosystems
```

## 🎯 **Expected Results**

After deploying this fix:

✅ **Frontend** can successfully fetch data from API
✅ **CORS preflight** requests handled properly
✅ **Authentication** works with proper headers
✅ **Development** and **production** both supported

## 🆘 **If CORS Still Doesn't Work**

### **Alternative 1: Simplify .htaccess**

Add this to the top of your `api/.htaccess`:

```apache
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
Header always set Access-Control-Allow-Headers "*"
```

### **Alternative 2: PHP Direct Headers**

Add this to `api/public/index.php` (top of file):

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// ... rest of Laravel bootstrap
```

## 🚀 **Quick Test Command**

Run this in your browser console to test CORS:

```javascript
fetch('https://api.ecocuriositylab.me/api/test')
  .then(response => response.json())
  .then(data => console.log('✅ CORS Working:', data))
  .catch(error => console.error('❌ CORS Failed:', error))
```

---

**This fix should resolve all CORS issues between your React frontend and Laravel API!** 🎉
