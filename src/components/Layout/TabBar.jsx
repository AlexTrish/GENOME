import React from 'react';
import { X } from 'lucide-react';
import { useGenomeStore } from '../../store';
import clsx from 'clsx';

export const TabBar = () => {
  const { 
    openTabs, 
    activeTab, 
    setActiveTab, 
    closeTab,
    sidebarOpen 
  } = useGenomeStore();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCloseTab = (e, tabId) => {
    e.stopPropagation();
    closeTab(tabId);
  };

  return (
    <div 
      className="h-9 bg-gray-800 border-b border-gray-700 flex items-center overflow-x-auto hide-scrollbar relative z-[9998]"
      style={{ 
        marginLeft: sidebarOpen ? '48px' : '0px',
        transition: 'margin-left 0.3s ease'
      }}
    >
      <div className="flex min-w-0">
        {openTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 border-r border-gray-700 cursor-pointer min-w-0 max-w-xs group relative',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
              
              {/* Dirty indicator */}
              {tab.isDirty && (
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
              )}
              
              {/* Tab title */}
              <span className="truncate text-sm font-medium min-w-0">
                {tab.title}
              </span>
              
              {/* Close button */}
              <button
                onClick={(e) => handleCloseTab(e, tab.id)}
                className="w-4 h-4 flex items-center justify-center rounded hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};