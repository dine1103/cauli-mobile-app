import { useState } from "react";
import { BroccoliCharacter } from "./BroccoliCharacter";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Edit3, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [userName] = useState("Người dùng");
  const [joinDate] = useState("Tham gia từ tháng 3, 2024");

  const settingsItems = [
    { icon: Bell, label: "Thông báo", onClick: () => {} },
    { icon: Shield, label: "Quyền riêng tư", onClick: () => {} },
    { icon: HelpCircle, label: "Trợ giúp & Hỗ trợ", onClick: () => {} },
  ];

  const stats = [
    { label: "Ngày trò chuyện", value: "15" },
    { label: "Tin nhắn đã gửi", value: "234" },
    { label: "Mục tiêu hoàn thành", value: "8" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-lime-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-green-200 p-4">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-medium text-gray-800 flex-1">Hồ sơ</h1>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile section */}
        <Card className="bg-white/70 backdrop-blur-sm border-green-200 p-6 text-center">
          <div className="mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="font-medium text-gray-800">{userName}</h2>
            <p className="text-sm text-gray-600">{joinDate}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BroccoliCharacter size="small" />
            <span className="text-sm text-green-600 font-medium">Bạn của Cauli</span>
          </div>
        </Card>

        {/* Stats */}
        <Card className="bg-white/70 backdrop-blur-sm border-green-200 p-4">
          <h3 className="font-medium text-gray-800 mb-3">Thống kê của bạn</h3>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-medium text-green-600">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="bg-white/70 backdrop-blur-sm border-green-200 p-4">
          <h3 className="font-medium text-gray-800 mb-3">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs">💬</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Trò chuyện với Cauli</p>
                <p className="text-xs text-gray-600">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-xs">😊</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Cập nhật tâm trạng</p>
                <p className="text-xs text-gray-600">1 ngày trước</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-green-200 p-4">
          <h3 className="font-medium text-gray-800 mb-3">Cài đặt</h3>
          <div className="space-y-1">
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-800 flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}
          </div>
        </Card>

        {/* Logout */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}