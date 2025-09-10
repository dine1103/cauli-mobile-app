import { useState, useRef, useEffect } from "react";
import { CauliLogo } from "./CauliLogo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft, Send, Smile, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "cauli";
  timestamp: Date;
}

interface ChatScreenProps {
  onBack: () => void;
}

export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Mình là Cauli, trợ lý AI của bạn. Rất vui được gặp bạn! 😊\n\nHôm nay bạn cảm thấy như thế nào? Có điều gì bạn muốn chia sẻ với mình không?",
      sender: "cauli",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cauliResponses = [
    "Mình hiểu cảm giác của bạn. Điều đó nghe có vẻ thật sự quan trọng với bạn. Bạn có muốn chia sẻ thêm về điều này không?",
    "Cảm ơn bạn đã tin tưởng và chia sẻ với mình. Mình luôn ở đây để lắng nghe bạn. 💙",
    "Mình cảm thấy bạn đã rất dũng cảm khi chia sẻ điều này. Bạn nghĩ gì về cách để cải thiện tình hình này?",
    "Đó là một cảm xúc hoàn toàn bình thường. Mọi người đều trải qua những lúc như vậy. Bạn có muốn nói thêm không?",
    "Mình rất trân trọng sự tin tưởng của bạn. Hãy nhớ rằng mình luôn sẵn sàng lắng nghe và hỗ trợ bạn nhé! 🌟",
    "Nghe bạn nói như vậy, mình cảm thấy bạn có một góc nhìn rất tích cực. Điều đó thật tuyệt vời!",
    "Có vẻ như đây là một chủ đề quan trọng với bạn. Mình muốn hiểu rõ hơn về cảm xúc của bạn. Bạn có thể mô tả chi tiết hơn không?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate Cauli's thinking and response
    setTimeout(() => {
      setIsTyping(false);
      const cauliResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: cauliResponses[Math.floor(Math.random() * cauliResponses.length)],
        sender: "cauli",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cauliResponse]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between p-4 pt-12">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <CauliLogo size="small" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">Cauli</h1>
                <p className="text-sm text-green-600">Đang hoạt động</p>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
              {message.sender === "cauli" && (
                <div className="flex items-end space-x-2 mb-2">
                  <CauliLogo size="small" />
                  <span className="text-xs text-gray-500 font-medium">Cauli</span>
                </div>
              )}
              <div
                className={`p-4 rounded-2xl shadow-sm ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-md"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "user" ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-end space-x-2 mb-2">
                <CauliLogo size="small" />
                <span className="text-xs text-gray-500 font-medium">Cauli</span>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50 p-4 shadow-lg">
        <div className="flex items-end space-x-3 max-w-sm mx-auto">
          <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="w-full min-h-[48px] bg-gray-100 border-0 rounded-3xl px-4 py-3 pr-14 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-green-500 resize-none"
              style={{ maxHeight: "120px" }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 rounded-full w-10 h-10 p-0 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}