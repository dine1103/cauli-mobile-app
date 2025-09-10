import { CauliLogo } from "./CauliLogo";

interface SplashScreenProps {
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  isLast?: boolean;
}

export function SplashScreen({ title, subtitle, currentStep, totalSteps, onNext, isLast }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      
      {/* Status bar */}
      <div className="flex justify-between items-center p-4 pt-12 text-white/80 text-sm">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
        <div>9:41</div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1.5 bg-white rounded-xs m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo */}
        <div className="mb-12 transform scale-110">
          <CauliLogo size="large" />
        </div>

        {/* Text content */}
        <div className="mb-16 space-y-4">
          <h1 className="text-2xl font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-sm">
            {subtitle}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex space-x-3 mb-12">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-white' 
                  : index < currentStep 
                    ? 'w-2 bg-white/80'
                    : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={onNext}
          className="w-full max-w-sm bg-white text-green-600 py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          {isLast ? "Bắt đầu" : "Tiếp tục"}
        </button>
      </div>

      {/* Skip option for non-last screens */}
      {!isLast && (
        <div className="pb-8 text-center">
          <button 
            onClick={onNext}
            className="text-white/70 text-base hover:text-white transition-colors"
          >
            Bỏ qua
          </button>
        </div>
      )}
    </div>
  );
}