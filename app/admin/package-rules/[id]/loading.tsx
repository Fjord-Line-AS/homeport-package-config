import { Package } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-seashell-50 to-white">
      <div className="text-center space-y-6">
        {/* Animated Package Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red-500 to-brand-ocean-500 rounded-2xl opacity-20 animate-pulse-glow"></div>

            {/* Main icon container */}
            <div className="absolute inset-2 bg-white rounded-xl shadow-brand flex items-center justify-center">
              <Package
                className="w-10 h-10 text-brand-red-600 z-50"
                style={{ animationDuration: "1.5s" }}
              />
            </div>

            {/* Rotating border */}
            <div
              className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-brand-red-500 via-brand-ocean-500 to-brand-glow-500 rounded-2xl animate-spin opacity-30"
              style={{ animationDuration: "3s" }}
            ></div>
            <div className="absolute inset-1 bg-white rounded-xl"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-brand-night-800">
            Loading Package Rule
          </h2>
          <p className="text-brand-night-600">
            Please wait while we fetch the configuration...
          </p>
        </div>

        {/* Simple progress dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-brand-red-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
