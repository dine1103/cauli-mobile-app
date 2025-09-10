import { CauliLogo } from "./CauliLogo";
import { Button } from "./ui/button";

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function WelcomeScreen({ onLogin, onRegister }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-5 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-5 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl"></div>
      
      {/* Status bar */}
      <div className="flex justify-between items-center p-4 pt-12 text-gray-600 text-sm">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
        </div>
        <div className="font-medium">9:41</div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-gray-800 rounded-sm bg-gray-800"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Logo and branding */}
        <div className="mb-8">
          <CauliLogo size="large" />
        </div>
        
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">cauli</h1>
          <div className="w-12 h-1 bg-green-500 rounded-full mx-auto"></div>
        </div>

        {/* Welcome message */}
        <div className="text-center mb-16 max-w-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 leading-tight">
            Chào mừng bạn đến với Cauli
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nơi bạn có thể chia sẻ tâm sự và nhận được sự đồng hành từ AI thông minh và thấu hiểu.
          </p>
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={onRegister}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Tạo tài khoản mới
          </Button>
          
          <Button 
            onClick={onLogin}
            variant="outline"
            className="w-full h-14 border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-2xl font-semibold text-lg transition-all duration-200"
          >
            Đăng nhập
          </Button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-8 max-w-sm leading-relaxed">
          Bằng việc tiếp tục, bạn đồng ý với{" "}
          <span className="text-green-600 font-medium">Điều khoản sử dụng</span> và{" "}
          <span className="text-green-600 font-medium">Chính sách bảo mật</span> của chúng tôi.
        </p>
      </div>
    </div>
  );
}