import React, { useState } from 'react';
import { 
  Minimize2, 
  Maximize2, 
  X, 
  Save, 
  FolderOpen,
  Plus,
  Download,
  Upload,
  Play,
  Settings,
  ChevronDown
} from 'lucide-react';
import { useGenomeStore } from '../../store';
import { appWindow } from '@tauri-apps/api/window';

const DropdownMenu = ({ trigger, items, isOpen, onToggle }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-all duration-150"
    >
      {trigger}
      <ChevronDown className="w-3 h-3" />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-2xl z-[9999]">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => { item.action(); onToggle(); }}
            className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 transition-colors"
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.label}
            {item.shortcut && (
              <span className="ml-auto text-xs text-gray-500">{item.shortcut}</span>
            )}
          </button>
        ))}
      </div>
    )}
  </div>
);

export const TitleBar = () => {
  const { 
    currentProject, 
    isMaximized, 
    setMaximized,
    createProject,
    saveProject,
    exportProject,
    importData,
    tasks,
    clearAll
  } = useGenomeStore();

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMinimize = async () => {
    await appWindow.minimize();
  };

  const handleMaximize = async () => {
    if (isMaximized) {
      await appWindow.unmaximize();
      setMaximized(false);
    } else {
      await appWindow.maximize();
      setMaximized(true);
    }
  };

  const handleClose = async () => {
    await appWindow.close();
  };

  const handleNewProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
      createProject({
        name: projectName,
        description: 'New bioinformatics project',
        type: 'general'
      });
    }
  };

  const handleOpenProject = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.genome';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Loading project:', file.name);
      }
    };
    input.click();
  };

  const handleSaveProject = async () => {
    if (currentProject) {
      await saveProject(currentProject);
    }
  };

  const handleExportProject = async () => {
    if (currentProject) {
      await exportProject(currentProject);
    }
  };

  const handleImportData = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.fasta,.fastq,.vcf,.gff,.sam,.bam';
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => importData(file));
    };
    input.click();
  };

  const runningTasks = tasks.filter(task => task.status === 'running').length;

  const fileMenuItems = [
    { label: 'New Project', icon: Plus, action: handleNewProject, shortcut: 'Ctrl+N' },
    { label: 'Open Project', icon: FolderOpen, action: handleOpenProject, shortcut: 'Ctrl+O' },
    { label: 'Save Project', icon: Save, action: handleSaveProject, shortcut: 'Ctrl+S' },
    { label: 'Import Data', icon: Upload, action: handleImportData, shortcut: 'Ctrl+I' },
    { label: 'Export Project', icon: Download, action: handleExportProject, shortcut: 'Ctrl+E' },
  ];

  const toolsMenuItems = [
    { label: 'Preferences', icon: Settings, action: () => console.log('Preferences') },
    { label: 'Clear All Data', action: clearAll },
  ];

  return (
    <div 
      className="h-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between select-none relative z-[9999]"
      data-tauri-drag-region
    >
      {/* Left Section - Logo and Menu */}
      <div className="flex items-center h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 h-full">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">G</span>
          </div>
          <span className="text-white font-medium text-sm">GENOME</span>
        </div>
        
        {/* Menu */}
        <div className="flex items-center h-full">
          <DropdownMenu
            trigger="File"
            items={fileMenuItems}
            isOpen={activeMenu === 'file'}
            onToggle={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
          />
          <DropdownMenu
            trigger="Tools"
            items={toolsMenuItems}
            isOpen={activeMenu === 'tools'}
            onToggle={() => setActiveMenu(activeMenu === 'tools' ? null : 'tools')}
          />
        </div>
      </div>

      {/* Center Section - Project Status */}
      <div className="flex items-center gap-3">
        {currentProject && (
          <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded border border-gray-600/30">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-300">{currentProject.name}</span>
          </div>
        )}
        
        {runningTasks > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-900/30 rounded border border-blue-600/30">
            <Play className="w-3 h-3 text-blue-400 animate-pulse" />
            <span className="text-xs text-blue-300">{runningTasks}</span>
          </div>
        )}
      </div>

      {/* Right Section - Quick Actions and Window Controls */}
      <div className="flex items-center h-full">
        {/* Quick Actions */}
        <div className="flex items-center gap-1 mr-3">
          <button
            onClick={handleSaveProject}
            disabled={!currentProject}
            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            title="Save Project (Ctrl+S)"
          >
            <Save className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleImportData}
            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-all duration-150"
            title="Import Data (Ctrl+I)"
          >
            <Upload className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleExportProject}
            disabled={!currentProject}
            className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            title="Export Project (Ctrl+E)"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Window Controls */}
        <div className="flex items-center h-full border-l border-gray-700/50">
          <button
            onClick={handleMinimize}
            className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-150"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-150"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleClose}
            className="w-11 h-full flex items-center justify-center hover:bg-red-600 text-gray-400 hover:text-white transition-all duration-150"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};