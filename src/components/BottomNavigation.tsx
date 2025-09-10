import { Home, MessageCircle, Calendar, User } from "lucide-react";

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Trang chủ" },
    { id: "chat", icon: MessageCircle, label: "Trò chuyện" },
    { id: "diary", icon: Calendar, label: "Nhật ký" },
    { id: "profile", icon: User, label: "Hồ sơ" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl">
      <div className="flex items-center justify-around py-2 px-4 max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "scale-110" : ""} transition-transform duration-200`} />
              <span className={`text-xs font-medium ${isActive ? "text-white" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}