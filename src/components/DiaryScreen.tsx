import { useState } from "react";
import { CauliLogo } from "./CauliLogo";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Plus, Calendar, Heart, Smile } from "lucide-react";

interface DiaryEntry {
  id: string;
  date: Date;
  mood: string;
  moodEmoji: string;
  content: string;
}

export function DiaryScreen() {
  const [entries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: new Date(2024, 2, 15),
      mood: "Vui vẻ",
      moodEmoji: "😊",
      content: "Hôm nay có một ngày tuyệt vời! Tôi đã hoàn thành được nhiều công việc và cảm thấy rất hài lòng với bản thân.",
    },
    {
      id: "2", 
      date: new Date(2024, 2, 14),
      mood: "Bình thường",
      moodEmoji: "😌",
      content: "Một ngày bình thường, không có gì đặc biệt. Tôi dành thời gian đọc sách và nghỉ ngơi.",
    },
  ]);

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntryContent, setNewEntryContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<{emoji: string, label: string} | null>(null);

  const moodOptions = [
    { emoji: "😊", label: "Vui vẻ" },
    { emoji: "😌", label: "Bình thường" },
    { emoji: "😔", label: "Buồn" },
    { emoji: "😰", label: "Lo lắng" },
    { emoji: "😴", label: "Mệt mỏi" },
    { emoji: "🥳", label: "Hào hứng" },
  ];

  const handleSaveEntry = () => {
    if (newEntryContent.trim() && selectedMood) {
      // Here you would typically save to a database
      setNewEntryContent("");
      setSelectedMood(null);
      setShowNewEntry(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-lime-50 pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-green-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-green-600" />
            <h1 className="font-medium text-gray-800">Nhật ký của tôi</h1>
          </div>
          <button
            onClick={() => setShowNewEntry(true)}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* New entry form */}
        {showNewEntry && (
          <Card className="bg-white/70 backdrop-blur-sm border-green-200 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Viết nhật ký mới</h3>
                <div className="flex items-center space-x-2">
                  <CauliLogo size="small" />
                  <span className="text-sm text-green-600">Cauli đang lắng nghe</span>
                </div>
              </div>

              {/* Mood selection */}
              <div>
                <p className="text-sm text-gray-700 mb-2">Tâm trạng hôm nay:</p>
                <div className="grid grid-cols-3 gap-2">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(mood)}
                      className={`flex items-center space-x-2 p-2 rounded-lg border-2 transition-colors ${
                        selectedMood?.emoji === mood.emoji
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <span className="text-lg">{mood.emoji}</span>
                      <span className="text-xs">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <Textarea
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                  placeholder="Hôm nay bạn cảm thấy thế nào? Hãy chia sẻ những suy nghĩ của bạn..."
                  className="min-h-24 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  onClick={handleSaveEntry}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={!newEntryContent.trim() || !selectedMood}
                >
                  Lưu nhật ký
                </Button>
                <Button
                  onClick={() => setShowNewEntry(false)}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Hủy
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Entries list */}
        <div className="space-y-3">
          {entries.map((entry) => (
            <Card key={entry.id} className="bg-white/70 backdrop-blur-sm border-green-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{entry.moodEmoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{entry.mood}</p>
                    <p className="text-xs text-gray-600">
                      {entry.date.toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Heart className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{entry.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}