# 🚀 Quick Deployment Steps for api.ecocuriositylab.me

## ⚡ Fast Track Deployment (5 Steps)

### 1. Run Deployment Script

```bash
./deploy.sh
```

This creates a `deployment` folder with your production-ready Laravel app.

### 2. Set Up Database on Hostinger

1. Login to **Hostinger Control Panel**
2. Go to **MySQL Databases**
3. Create database: `eco_curiosity_lab` (or your preferred name)
4. Create database user with full privileges
5. **Note down** the database name, username, and password

### 3. Upload Files

**Option A: File Manager (Easiest)**

1. Zip the `deployment` folder contents
2. Upload to your subdomain directory in Hostinger
3. Extract files

**Option B: FTP/SFTP**

1. Connect via FTP to your Hostinger account
2. Upload `deployment` folder contents to subdomain directory

### 4. Configure Environment

1. Create `.env` file in your subdomain root
2. Copy content from `PRODUCTION_ENV_TEMPLATE.txt`
3. **Update database credentials** with your Hostinger MySQL details:
   ```env
   DB_DATABASE=your_actual_database_name
   DB_USERNAME=your_actual_username
   DB_PASSWORD=your_actual_password
   ```

### 5. Import Database

1. Login to **phpMyAdmin** in Hostinger
2. Select your database
3. Import the `eco_curiosity_lab.sql` file
4. ✅ Done!

## 🔧 Set File Permissions

```bash
# If you have SSH access
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/
chmod 644 .env
```

## 🧪 Test Your API

Visit: `https://api.ecocuriositylab.me/api/ecosystems`

You should see your ecosystems data in JSON format! 🎉

## 🔧 Troubleshooting

**500 Error?**

- Check file permissions
- Verify .env database credentials
- Check error logs in `/storage/logs/`

**Database Connection Error?**

- Double-check database credentials in .env
- Ensure database exists and user has privileges

**CORS Errors?**

- Verify domain settings in .env file
- Check that SSL is enabled for your subdomain

## 📱 Update Frontend

Once your API is live, update your React app's API configuration:

```typescript
// In your src/lib/api.ts
const API_BASE_URL = 'https://api.ecocuriositylab.me/api'
```

Your Laravel API will be live at: **https://api.ecocuriositylab.me** 🚀

---

**Total deployment time: ~15-30 minutes** (depending on upload speed)
