function AuthLoader({ message = 'Processing...' }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center min-w-[300px]">
        {/* Spinning Logo Container */}
        <div className="relative mb-6 w-32 h-32 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-transparent border-t-[#e6c200] border-r-[#e6c200] rounded-full animate-spin"></div>
          
          {/* Inner rotating ring (opposite direction) */}
          <div className="absolute top-2 left-2 w-28 h-28 border-4 border-transparent border-b-[#00A896] border-l-[#00A896] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Logo in center */}
          <div className="relative z-10 w-24 h-24 flex items-center justify-center">
            <img 
              src="/logo.svg" 
              alt="Solitaire Logo" 
              className="w-20 h-20 animate-pulse"
              style={{ filter: 'none' }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-gray-800 font-medium text-lg mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {message}
          </p>
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-[#e6c200] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-[#e6c200] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#e6c200] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLoader

