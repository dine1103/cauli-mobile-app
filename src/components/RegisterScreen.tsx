import { useState } from "react";
import { CauliLogo } from "./CauliLogo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBack: () => void;
}

export function RegisterScreen({ onRegisterSuccess, onBack }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Tạo tài khoản</h1>
        <div className="w-10 h-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-4">
        {/* Logo */}
        <div className="mb-6">
          <CauliLogo size="medium" />
        </div>

        {/* Welcome message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tham gia cùng Cauli
          </h2>
          <p className="text-gray-600">
            Tạo tài khoản để bắt đầu hành trình chăm sóc tâm lý
          </p>
        </div>

        {/* Registration form */}
        <div className="w-full max-w-sm space-y-4">
          {/* Name input */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:border-green-500 focus:ring-0 transition-colors"
            />
          </div>

          {/* Email input */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:border-green-500 focus:ring-0 transition-colors"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-14 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:border-green-500 focus:ring-0 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password input */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-14 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:border-green-500 focus:ring-0 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 py-3 px-4 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Register button */}
          <Button 
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 mt-6"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang tạo tài khoản...</span>
              </div>
            ) : (
              "Tạo tài khoản"
            )}
          </Button>
        </div>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{" "}
            <button 
              onClick={onBack}
              className="text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-4 max-w-sm leading-relaxed">
          Bằng việc tạo tài khoản, bạn đồng ý với{" "}
          <span className="text-green-600 font-medium">Điều khoản sử dụng</span> và{" "}
          <span className="text-green-600 font-medium">Chính sách bảo mật</span>.
        </p>
      </div>
    </div>
  );
}