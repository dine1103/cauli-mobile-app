export function BroccoliCharacter({ size = "large", showText = false }: { size?: "small" | "medium" | "large", showText?: boolean }) {
  const sizeClasses = {
    small: "w-16 h-20",
    medium: "w-24 h-28", 
    large: "w-32 h-40"
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} relative flex items-end justify-center`}>
        {/* Broccoli head */}
        <div className="absolute top-0 w-full h-3/4 bg-green-600 rounded-full relative overflow-hidden">
          {/* Broccoli texture dots */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-green-700 rounded-full"></div>
          <div className="absolute top-3 right-3 w-1 h-1 bg-green-700 rounded-full"></div>
          <div className="absolute bottom-3 left-1/2 w-1 h-1 bg-green-700 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1 w-1 h-1 bg-green-700 rounded-full"></div>
          <div className="absolute top-1/2 right-1 w-1 h-1 bg-green-700 rounded-full"></div>
          
          {/* Broccoli florets */}
          <div className="absolute top-1 left-1/4 w-3 h-3 bg-green-600 rounded-full border-2 border-green-700"></div>
          <div className="absolute top-1 right-1/4 w-3 h-3 bg-green-600 rounded-full border-2 border-green-700"></div>
          <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-green-600 rounded-full border border-green-700 transform -translate-x-1/2"></div>
        </div>
        
        {/* Stem/body */}
        <div className="w-2/3 h-2/5 bg-lime-400 rounded-lg relative">
          {/* Face */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            {/* Eyes */}
            <div className="flex space-x-1 mb-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            {/* Smile */}
            <div className="w-2 h-1 border-b-2 border-black rounded-full"></div>
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="mt-2 text-center">
          <h2 className="text-green-700 font-bold text-xl">cauli</h2>
        </div>
      )}
    </div>
  );
}