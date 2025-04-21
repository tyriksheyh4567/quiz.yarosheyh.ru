export function QuizWhizLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className} transition-transform duration-300 hover:scale-110 group`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#gradient)"
          stroke="#8B5CF6"
          strokeWidth="2"
          className="transition-all duration-500 group-hover:stroke-width-3"
        />

        {/* Brain icon */}
        <path
          d="M65 35C65 30.0294 60.9706 26 56 26C53.0447 26 50.4123 27.4405 48.7148 29.6719C47.0172 27.4405 44.3848 26 41.4295 26C36.4589 26 32.4295 30.0294 32.4295 35C32.4295 36.8378 33.0064 38.5392 33.9955 39.9414C31.6377 42.0256 30.1377 45.0256 30.1377 48.3789C30.1377 51.7323 31.6377 54.7323 33.9955 56.8164C33.0064 58.2187 32.4295 59.9201 32.4295 61.7578C32.4295 66.7285 36.4589 70.7578 41.4295 70.7578C44.3848 70.7578 47.0172 69.3174 48.7148 67.0859C50.4123 69.3174 53.0447 70.7578 56 70.7578C60.9706 70.7578 65 66.7285 65 61.7578C65 59.9201 64.4231 58.2187 63.434 56.8164C65.7918 54.7323 67.2918 51.7323 67.2918 48.3789C67.2918 45.0256 65.7918 42.0256 63.434 39.9414C64.4231 38.5392 65 36.8378 65 35Z"
          fill="#8B5CF6"
          stroke="white"
          strokeWidth="2"
          className="transition-all duration-500 group-hover:fill-purple-700"
        />

        {/* Lightning bolt */}
        <path
          d="M50 30L40 50H50L45 70L60 45H50L55 30H50Z"
          fill="white"
          stroke="white"
          strokeWidth="1"
          className="transition-all duration-500 group-hover:fill-yellow-300 group-hover:stroke-yellow-300"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
