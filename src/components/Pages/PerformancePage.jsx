import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Activity, Zap, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const MetricCard = ({ title, value, unit, icon: Icon, color, trend, status }) => (
  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 ${color}`} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {status && (
        <div className={`p-1 rounded-full ${
          status === 'good' ? 'bg-green-100 dark:bg-green-900/30' : 
          status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
          'bg-red-100 dark:bg-red-900/30'
        }`}>
          {status === 'good' ? (
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
          ) : (
            <AlertTriangle className={`w-4 h-4 ${
              status === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
            }`} />
          )}
        </div>
      )}
    </div>
    
    <div className="flex items-end justify-between">
      <div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{unit}</div>
      </div>
      {trend && (
        <div className={`text-sm font-medium ${
          trend > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
        }`}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
  </div>
);

const ProgressBar = ({ label, value, max, color, showPercentage = true }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-gray-900 dark:text-white font-medium">
        {showPercentage ? `${((value / max) * 100).toFixed(1)}%` : `${value}/${max}`}
      </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
      <div 
        className={`${color} h-3 rounded-full transition-all duration-500`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

const ProcessList = ({ processes }) => (
  <div className="space-y-2">
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Active Processes</h4>
    <div className="space-y-1 max-h-32 overflow-y-auto thin-scrollbar">
      {processes.map((process, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
          <span className="text-gray-900 dark:text-white truncate">{process.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">{process.cpu}%</span>
            <span className="text-gray-500 dark:text-gray-400">{process.memory}MB</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PerformancePage = () => {
  const [metrics, setMetrics] = useState({
    cpu: { value: 45, trend: -2 },
    memory: { value: 2.1, max: 8, trend: 1 },
    disk: { value: 156, max: 500, trend: 0 },
    network: { value: 12.5, trend: -5 }
  });

  const [processes] = useState([
    { name: 'GENOME Main Process', cpu: 15, memory: 512 },
    { name: 'Sequence Alignment', cpu: 25, memory: 256 },
    { name: 'File Parser', cpu: 5, memory: 128 },
    { name: 'Data Visualization', cpu: 8, memory: 192 },
  ]);

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: { 
          value: Math.max(0, Math.min(100, prev.cpu.value + (Math.random() - 0.5) * 10)),
          trend: (Math.random() - 0.5) * 10
        },
        memory: { 
          ...prev.memory,
          value: Math.max(0, Math.min(prev.memory.max, prev.memory.value + (Math.random() - 0.5) * 0.5)),
          trend: (Math.random() - 0.5) * 5
        },
        disk: { 
          ...prev.disk,
          value: Math.max(0, Math.min(prev.disk.max, prev.disk.value + (Math.random() - 0.5) * 2)),
          trend: (Math.random() - 0.5) * 2
        },
        network: { 
          value: Math.max(0, prev.network.value + (Math.random() - 0.5) * 5),
          trend: (Math.random() - 0.5) * 15
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatus = (type, value, max) => {
    const percentage = max ? (value / max) * 100 : value;
    if (percentage < 50) return 'good';
    if (percentage < 80) return 'warning';
    return 'critical';
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="text-center">
        <Cpu className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Performance Monitor
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Real-time system performance and resource usage
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Auto-refresh</span>
          </label>
          {autoRefresh && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Updating every 2 seconds
            </div>
          )}
        </div>
        
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Now
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="CPU Usage"
          value={metrics.cpu.value.toFixed(1)}
          unit="%"
          icon={Cpu}
          color="text-red-500"
          trend={metrics.cpu.trend.toFixed(1)}
          status={getStatus('cpu', metrics.cpu.value, 100)}
        />
        
        <MetricCard
          title="Memory"
          value={metrics.memory.value.toFixed(1)}
          unit={`GB / ${metrics.memory.max}GB`}
          icon={HardDrive}
          color="text-blue-500"
          trend={metrics.memory.trend.toFixed(1)}
          status={getStatus('memory', metrics.memory.value, metrics.memory.max)}
        />
        
        <MetricCard
          title="Disk Usage"
          value={metrics.disk.value}
          unit={`GB / ${metrics.disk.max}GB`}
          icon={HardDrive}
          color="text-green-500"
          trend={metrics.disk.trend.toFixed(1)}
          status={getStatus('disk', metrics.disk.value, metrics.disk.max)}
        />
        
        <MetricCard
          title="Network"
          value={metrics.network.value.toFixed(1)}
          unit="MB/s"
          icon={Activity}
          color="text-purple-500"
          trend={metrics.network.trend.toFixed(1)}
          status="good"
        />
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resource Usage */}
        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resource Usage</h3>
          <div className="space-y-6">
            <ProgressBar 
              label="CPU" 
              value={metrics.cpu.value} 
              max={100} 
              color="bg-red-500" 
            />
            <ProgressBar 
              label="Memory" 
              value={metrics.memory.value} 
              max={metrics.memory.max} 
              color="bg-blue-500"
              showPercentage={false}
            />
            <ProgressBar 
              label="Disk" 
              value={metrics.disk.value} 
              max={metrics.disk.max} 
              color="bg-green-500"
              showPercentage={false}
            />
          </div>
        </div>

        {/* Process Monitor */}
        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Process Monitor</h3>
          <ProcessList processes={processes} />
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Processes:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{processes.length}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Active Tasks:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-gray-600 dark:text-gray-400">Platform:</div>
            <div className="font-medium text-gray-900 dark:text-white">Tauri Desktop App</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Version:</div>
            <div className="font-medium text-gray-900 dark:text-white">GENOME v1.0.0</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Uptime:</div>
            <div className="font-medium text-gray-900 dark:text-white">2h 34m</div>
          </div>
        </div>
      </div>
    </div>
  );
};