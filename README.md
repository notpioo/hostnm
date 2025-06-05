# NoMercy Gaming Community

Website komunitas gaming dengan teknologi PWA yang dapat diinstall di desktop, iOS, dan Android.

## Fitur

- 🎮 Komunitas gaming dengan tema abu-abu dan orange
- 📱 Progressive Web App (PWA) - dapat diinstall di semua device
- 🔐 Autentikasi Firebase (login/register)
- 📊 Dashboard gaming dengan statistik
- 📱 Design responsif untuk semua perangkat
- 🚀 Ready untuk deploy ke Railway

## Deploy ke Railway

### 1. Persiapan Repository
- Push code ini ke GitHub repository Anda
- Pastikan semua file sudah ter-commit

### 2. Setup Railway
1. Buka [railway.app](https://railway.app)
2. Login dengan GitHub
3. Klik "New Project" → "Deploy from GitHub repo"
4. Pilih repository NoMercy Anda

### 3. Environment Variables
Tambahkan environment variables berikut di Railway dashboard:

```
VITE_FIREBASE_API_KEY=AIzaSyBlHomdlq0ziskwGtE9CRyjA84r85vRD9A
VITE_FIREBASE_AUTH_DOMAIN=nomercy-ea37a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nomercy-ea37a
VITE_FIREBASE_STORAGE_BUCKET=nomercy-ea37a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=636693283731
VITE_FIREBASE_APP_ID=1:636693283731:web:9b167a38514517c17a1e66
VITE_FIREBASE_MEASUREMENT_ID=G-GRKR34WSFW
```

### 4. Railway Configuration
Railway akan menggunakan command `npm run dev` untuk menjalankan aplikasi. Konfigurasi sudah dioptimalkan untuk deployment yang stable.

### 5. Firebase Setup
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project "nomercy-ea37a"
3. Di Authentication → Settings → Authorized domains
4. Tambahkan domain Railway Anda (contoh: `yourapp.railway.app`)

### Troubleshooting
Jika mengalami error deployment:
1. Pastikan semua environment variables sudah ditambahkan
2. Redeploy project di Railway dashboard
3. Check logs di Railway untuk error detail

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## PWA Features

- Install prompt otomatis
- Offline capability
- Service worker untuk caching
- App shortcuts
- Manifest file lengkap

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: Wouter
- **State Management**: TanStack Query
- **PWA**: Service Worker + Web App Manifest