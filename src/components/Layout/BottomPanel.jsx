import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { useGenomeStore } from '../../store';
import clsx from 'clsx';

const ConsoleTab = () => {
  const logs = [
    { type: 'info', message: 'GENOME Bioinformatics v1.0.0 initialized', timestamp: '10:30:15' },
    { type: 'success', message: 'FASTA file loaded successfully: sample.fasta', timestamp: '10:30:22' },
    { type: 'info', message: 'Starting sequence alignment analysis...', timestamp: '10:30:45' },
    { type: 'success', message: 'Alignment completed with score: 245', timestamp: '10:31:02' },
    { type: 'warning', message: 'Low quality scores detected in region 1200-1250', timestamp: '10:31:15' }
  ];
  
  return (
    <div className="h-full bg-gray-900 text-gray-300 font-mono text-sm overflow-y-auto">
      <div className="p-2 space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">{log.timestamp}</span>
            {log.type === 'info' && <AlertCircle className="w-3 h-3 text-blue-400" />}
            {log.type === 'success' && <CheckCircle className="w-3 h-3 text-green-400" />}
            {log.type === 'warning' && <AlertCircle className="w-3 h-3 text-yellow-400" />}
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TasksTab = () => {
  const { tasks } = useGenomeStore();
  
  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-2 space-y-2">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-4">
            No active tasks
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="bg-gray-800 p-2 rounded text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{task.name}</span>
                <div className="flex items-center gap-2">
                  {task.status === 'running' && <Clock className="w-3 h-3 text-blue-400 animate-spin" />}
                  {task.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-400" />}
                  <span className={clsx(
                    'text-xs px-2 py-1 rounded',
                    task.status === 'running' && 'bg-blue-900 text-blue-300',
                    task.status === 'completed' && 'bg-green-900 text-green-300',
                    task.status === 'error' && 'bg-red-900 text-red-300'
                  )}>
                    {task.status}
                  </span>
                </div>
              </div>
              {task.status === 'running' && (
                <div className="mt-2">
                  <div className="bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const BottomPanel = () => {
  const { 
    bottomPanelOpen, 
    toggleBottomPanel, 
    activeBottomTab, 
    setActiveBottomTab 
  } = useGenomeStore();
  
  if (!bottomPanelOpen) return null;
  
  const tabs = [
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'tasks', label: 'Tasks', icon: Clock },
    { id: 'problems', label: 'Problems', icon: AlertCircle }
  ];
  
  return (
    <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
      <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBottomTab(tab.id)}
                className={clsx(
                  'flex items-center gap-2 px-3 py-1 text-sm border-b-2 transition-colors',
                  activeBottomTab === tab.id
                    ? 'border-blue-400 text-blue-400 bg-gray-900'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                )}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={toggleBottomPanel}
          className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-300 mr-2"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      
      <div className="flex-1">
        {activeBottomTab === 'console' && <ConsoleTab />}
        {activeBottomTab === 'tasks' && <TasksTab />}
        {activeBottomTab === 'problems' && (
          <div className="h-full bg-gray-900 flex items-center justify-center text-gray-500">
            No problems detected
          </div>
        )}
      </div>
    </div>
  );
};