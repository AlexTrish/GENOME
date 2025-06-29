import React from 'react';
import { 
  Files, 
  Package, 
  Network, 
  Database,
  Settings
} from 'lucide-react';
import { useGenomeStore } from '../../store';
import clsx from 'clsx';

const sidebarItems = [
  { id: 'file-browser', label: 'File Browser', icon: Files },
  { id: 'extensions', label: 'Extensions', icon: Package },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { 
    sidebarOpen, 
    toggleSidebar,
    activeSidebarPanel,
    setActiveSidebarPanel
  } = useGenomeStore();

  if (!sidebarOpen) return null;

  return (
    <aside className="w-12 bg-gray-900 border-r border-gray-700 flex flex-col flex-shrink-0 relative z-[9997]">
      {/* Navigation Icons */}
      <nav className="flex-1 py-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSidebarPanel === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSidebarPanel(item.id)}
                className={clsx(
                  'w-full h-12 flex items-center justify-center transition-colors relative group',
                  isActive
                    ? 'text-white bg-gray-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
                title={item.label}
              >
                <Icon className="w-6 h-6" />
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
                )}
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999]">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 p-2">
        <div className="flex justify-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="System Active"></div>
        </div>
      </div>
    </aside>
  );
};