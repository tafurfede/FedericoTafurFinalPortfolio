"use client";

export default function DashboardWindow() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Window Header */}
        <div className="bg-gray-200 h-10 flex items-center px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          </div>
        </div>
        
        {/* Window Content */}
        <div className="flex h-[650px]">
          {/* Sidebar */}
          <div className="w-64 bg-gradient-to-b from-gray-700 to-gray-800 p-6">
            <div className="space-y-3">
              <NavItem text="Dashboard" active />
              <NavItem text="Clients" />
              <NavItem text="Calendar" />
              <NavItem text="Billing" />
              <NavItem text="Analytics" />
              <NavItem text="Reports" />
              <NavItem text="Your Practice" />
              <NavItem text="Telehealth" />
              <NavItem text="Oaklet AI" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-gradient-to-br from-gray-100 via-white to-gray-50 p-12 relative">
            {/* Schedule Widget */}
            <div className="absolute top-12 left-12 w-80 h-80 bg-white/90 rounded-xl p-6 shadow-lg">
              <div className="text-sm text-gray-600 mb-3">Today's Schedule</div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6"></div>
              </div>
            </div>
            
            {/* Revenue Widget */}
            <div className="absolute bottom-40 right-40 w-44 h-32 bg-white/90 rounded-xl p-6 shadow-lg flex items-center justify-center">
              <div>
                <div className="text-sm text-gray-600 mb-3">Revenue</div>
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[24px] border-t-gray-600 rotate-180 mx-auto"></div>
              </div>
            </div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-24 right-24 w-40 h-40 bg-gray-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-24 left-48 w-48 h-48 bg-gray-300/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <div 
      className={`text-white px-5 py-3 rounded-lg cursor-pointer transition-all text-base
        ${active 
          ? 'bg-white/20' 
          : 'hover:bg-white/10'
        }`}
    >
      {text}
    </div>
  );
}