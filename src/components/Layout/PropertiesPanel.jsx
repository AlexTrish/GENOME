import React, { useState } from 'react';
import { 
  X, 
  Info, 
  Settings, 
  BarChart3, 
  Activity,
  Clock,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  Eye,
  EyeOff,
  RefreshCw,
  Download
} from 'lucide-react';
import { useGenomeStore } from '../../store';

const StatCard = ({ icon: Icon, label, value, color = 'text-blue-400', trend }) => (
  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      {trend && (
        <span className={`text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="text-lg font-semibold text-white">{value}</div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);

const ProgressBar = ({ label, value, max, color = 'bg-blue-500' }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-300">{value}/{max}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

export const PropertiesPanel = () => {
  const { 
    propertiesOpen, 
    toggleProperties, 
    sequences, 
    tasks, 
    vcfRecords,
    currentProject 
  } = useGenomeStore();
  
  const [activeSection, setActiveSection] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  if (!propertiesOpen) return null;
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const runningTasks = tasks.filter(task => task.status === 'running').length;
  const errorTasks = tasks.filter(task => task.status === 'error').length;
  
  const totalBases = sequences.reduce((sum, seq) => sum + seq.length, 0);
  const avgLength = sequences.length > 0 ? Math.round(totalBases / sequences.length) : 0;
  
  const dnaSequences = sequences.filter(seq => seq.type === 'DNA').length;
  const rnaSequences = sequences.filter(seq => seq.type === 'RNA').length;
  const proteinSequences = sequences.filter(seq => seq.type === 'PROTEIN').length;
  
  const handleExportStats = () => {
    const stats = {
      project: currentProject?.name || 'Unknown',
      sequences: sequences.length,
      totalBases,
      avgLength,
      tasks: {
        completed: completedTasks,
        running: runningTasks,
        errors: errorTasks
      },
      variants: vcfRecords.length,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genome-stats-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-l border-gray-700 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Properties</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-1.5 rounded transition-colors ${
                autoRefresh 
                  ? 'bg-green-600/20 text-green-400' 
                  : 'hover:bg-gray-700 text-gray-400 hover:text-white'
              }`}
              title="Auto Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportStats}
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title="Export Statistics"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={toggleProperties}
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Section Tabs */}
        <div className="flex bg-gray-700/50 rounded-lg p-1">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded text-xs transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 enhanced-scrollbar">
        {activeSection === 'overview' && (
          <>
            {/* Project Info */}
            {currentProject && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  Project Information
                </h3>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-medium">{currentProject.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{currentProject.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span className="text-white">{new Date(currentProject.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Statistics Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-400" />
                Data Statistics
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <StatCard 
                  icon={Database} 
                  label="Sequences" 
                  value={sequences.length} 
                  color="text-blue-400"
                  trend={sequences.length > 0 ? 12 : 0}
                />
                <StatCard 
                  icon={Activity} 
                  label="Variants" 
                  value={vcfRecords.length} 
                  color="text-purple-400"
                />
                <StatCard 
                  icon={Zap} 
                  label="Total Bases" 
                  value={totalBases.toLocaleString()} 
                  color="text-yellow-400"
                />
                <StatCard 
                  icon={BarChart3} 
                  label="Avg Length" 
                  value={avgLength.toLocaleString()} 
                  color="text-green-400"
                />
              </div>
            </div>
            
            {/* Sequence Types */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Sequence Distribution</h3>
              <div className="space-y-2">
                <ProgressBar label="DNA" value={dnaSequences} max={sequences.length} color="bg-blue-500" />
                <ProgressBar label="RNA" value={rnaSequences} max={sequences.length} color="bg-green-500" />
                <ProgressBar label="Protein" value={proteinSequences} max={sequences.length} color="bg-purple-500" />
              </div>
            </div>
            
            {/* Task Status */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                Task Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Completed:</span>
                  <span className="text-green-400 font-medium">{completedTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Running:</span>
                  <span className="text-blue-400 font-medium">{runningTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Errors:</span>
                  <span className="text-red-400 font-medium">{errorTasks}</span>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeSection === 'performance' && (
          <>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-red-400" />
                System Performance
              </h3>
              
              <div className="space-y-3">
                <ProgressBar label="CPU Usage" value={45} max={100} color="bg-red-500" />
                <ProgressBar label="Memory" value={2.1} max={8} color="bg-yellow-500" />
                <ProgressBar label="Storage" value={156} max={500} color="bg-green-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <StatCard icon={Cpu} label="CPU" value="45%" color="text-red-400" />
                <StatCard icon={HardDrive} label="Memory" value="2.1GB" color="text-yellow-400" />
              </div>
            </div>
          </>
        )}
        
        {activeSection === 'settings' && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-400" />
                Quick Settings
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Auto-save results</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Show quality scores</span>
                  <input type="checkbox" className="rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Enable notifications</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Dark theme</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
              </div>
              
              <div className="pt-3 border-t border-gray-700">
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Advanced Settings
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};