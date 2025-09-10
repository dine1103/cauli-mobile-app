# Cauli - Mental Health Companion

Ứng dụng di động hỗ trợ sức khỏe tâm thần được xây dựng với React Native và Supabase.

## 🚀 Tính năng

- **SplashScreen với 4 Onboarding screens** - Giới thiệu ứng dụng
- **Authentication** - Đăng nhập/Đăng ký với Supabase
- **Chat Interface** - Giao diện chat thân thiện
- **Diary** - Nhật ký cá nhân
- **Profile Management** - Quản lý hồ sơ người dùng
- **Responsive Design** - Hỗ trợ cả web và mobile

## 🛠️ Công nghệ sử dụng

- **React Native** - Framework mobile
- **Expo** - Development platform
- **Supabase** - Backend as a Service
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **Linear Gradient** - UI styling

## 📱 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn
- Expo CLI
- Android Studio (cho Android)
- Xcode (cho iOS)

### Cài đặt dependencies
```bash
npm install
```

### Chạy trên web
```bash
npx expo start --web
```

### Chạy trên mobile
```bash
npx expo start
```

## 🎨 Screenshots

### SplashScreen & Onboarding
- 4 màn hình giới thiệu với animations
- Auto-advance mỗi 3 giây
- Manual navigation với nút "Tiếp theo"/"Bắt đầu"

### Authentication
- Login/Register screens
- Supabase authentication
- Secure session management

### Main App
- Home screen với navigation
- Chat interface
- Diary management
- Profile settings

## 🔧 Cấu hình

### Supabase Setup
1. Tạo project trên [Supabase](https://supabase.com)
2. Copy URL và API Key
3. Cập nhật trong `src/lib/supabase.ts`

### Environment Variables
```bash
# Tạo file .env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Cấu trúc project

```
src/
├── components/          # Reusable components
├── screens/            # Screen components
├── assets/             # Images và assets
├── lib/                # Utilities và config
└── styles/             # Global styles
```

## 🚀 Deployment

### Web
```bash
npx expo build:web
```

### Android
```bash
npx expo build:android
```

### iOS
```bash
npx expo build:ios
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/username/cauli-mobile-app](https://github.com/username/cauli-mobile-app)

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Supabase](https://supabase.com/)
- [React Navigation](https://reactnavigation.org/)