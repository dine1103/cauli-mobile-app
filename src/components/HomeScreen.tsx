import { CauliLogo } from "./CauliLogo";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MessageCircle, Heart, Calendar, Settings, TrendingUp, Sun, Moon } from "lucide-react";

interface HomeScreenProps {
  onChatStart: () => void;
  onProfileOpen: () => void;
}

export function HomeScreen({ onChatStart, onProfileOpen }: HomeScreenProps) {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const moodOptions = [
    { emoji: "😊", label: "Vui vẻ", color: "from-yellow-400 to-orange-400" },
    { emoji: "😌", label: "Bình thường", color: "from-blue-400 to-cyan-400" },
    { emoji: "😔", label: "Buồn", color: "from-gray-400 to-slate-400" },
    { emoji: "😰", label: "Lo lắng", color: "from-orange-400 to-red-400" },
  ];

  const quickActions = [
    { 
      icon: MessageCircle, 
      label: "Trò chuyện", 
      subtitle: "Nói chuyện với Cauli",
      color: "from-green-500 to-emerald-600", 
      onClick: onChatStart 
    },
    { 
      icon: Calendar, 
      label: "Nhật ký", 
      subtitle: "Ghi lại cảm xúc",
      color: "from-purple-500 to-violet-600", 
      onClick: () => {} 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-24">
      {/* Status bar */}
      <div className="flex justify-between items-center p-4 pt-12 text-gray-700 text-sm">
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

      {/* Header */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{getCurrentGreeting()}!</h1>
            <p className="text-gray-600 mt-1">Hôm nay bạn cảm thấy thế nào?</p>
          </div>
          <button 
            onClick={onProfileOpen}
            className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Cauli greeting card */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <CauliLogo size="small" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Xin chào từ Cauli! 👋</p>
              <p className="text-green-100 text-sm leading-relaxed">
                "Mình rất vui được đồng hành cùng bạn hôm nay. Hãy chia sẻ với mình những suy nghĩ của bạn nhé!"
              </p>
            </div>
          </div>
        </Card>

        {/* Mood tracker */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Tâm trạng hôm nay</h2>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {moodOptions.map((mood, index) => (
              <button
                key={index}
                className={`bg-gradient-to-r ${mood.color} text-white rounded-2xl p-4 flex items-center space-x-3 hover:scale-[1.02] transition-transform duration-200 shadow-md`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động nhanh</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`w-full bg-gradient-to-r ${action.color} text-white rounded-2xl p-4 flex items-center space-x-4 hover:scale-[1.02] transition-transform duration-200 shadow-md`}
                >
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{action.label}</div>
                    <div className="text-sm opacity-90">{action.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Daily insight */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">Lời khuyên hôm nay</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Hãy dành 5 phút mỗi ngày để thở sâu và cảm nhận những điều tốt đẹp xung quanh bạn. Điều này sẽ giúp bạn cảm thấy bình yên hơn.
              </p>
            </div>
          </div>
        </Card>

        {/* Weekly stats */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thống kê tuần này</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Ngày hoạt động</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Tin nhắn</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Nhật ký</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}