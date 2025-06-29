import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Settings, RefreshCw } from 'lucide-react';
import { useGenomeStore } from '../../store';

const ChartCard = ({ title, children, onExport, onSettings }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <div className="flex items-center gap-2">
        {onSettings && (
          <button
            onClick={onSettings}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Chart Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onExport}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Export Chart"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
    {children}
  </div>
);

const SequenceLengthChart = ({ sequences }) => {
  const lengthRanges = [
    { range: '0-1K', min: 0, max: 1000 },
    { range: '1K-10K', min: 1000, max: 10000 },
    { range: '10K-100K', min: 10000, max: 100000 },
    { range: '100K+', min: 100000, max: Infinity },
  ];

  const data = lengthRanges.map(range => ({
    ...range,
    count: sequences.filter(seq => seq.length >= range.min && seq.length < range.max).length
  }));

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-sm text-gray-600 dark:text-gray-400">{item.range}</div>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
            <div
              className="bg-blue-500 h-6 rounded-full transition-all duration-500"
              style={{ width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {item.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const SequenceTypeChart = ({ sequences }) => {
  const types = ['DNA', 'RNA', 'PROTEIN'];
  const data = types.map(type => ({
    type,
    count: sequences.filter(seq => seq.type === type).length,
    color: type === 'DNA' ? '#3b82f6' : type === 'RNA' ? '#10b981' : '#8b5cf6'
  }));

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.type}</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{item.count}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {total > 0 ? ((item.count / total) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const QualityDistribution = ({ sequences }) => {
  // Mock quality data for demonstration
  const qualityRanges = [
    { range: '0-20', count: 5, color: '#ef4444' },
    { range: '21-40', count: 12, color: '#f59e0b' },
    { range: '41-60', count: 25, color: '#eab308' },
    { range: '61-80', count: 18, color: '#22c55e' },
    { range: '81-100', count: 8, color: '#10b981' },
  ];

  const maxCount = Math.max(...qualityRanges.map(q => q.count));

  return (
    <div className="space-y-3">
      {qualityRanges.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-12 text-sm text-gray-600 dark:text-gray-400">{item.range}</div>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
            <div
              className="h-4 rounded-full transition-all duration-500"
              style={{ 
                width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%`,
                backgroundColor: item.color
              }}
            />
          </div>
          <div className="w-8 text-sm text-gray-900 dark:text-white text-right">{item.count}</div>
        </div>
      ))}
    </div>
  );
};

export const ChartsPage = () => {
  const { sequences, tasks, vcfRecords } = useGenomeStore();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = (chartName) => {
    console.log(`Exporting ${chartName} chart...`);
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 text-teal-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Charts & Analytics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Visualize and analyze your genomic data
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sequences.length}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Sequences</div>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{vcfRecords.length}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Variants</div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{tasks.length}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Analyses</div>
            </div>
            <PieChart className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {sequences.reduce((sum, seq) => sum + seq.length, 0).toLocaleString()}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Total Bases</div>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Data Visualizations</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard
          title="Sequence Length Distribution"
          onExport={() => handleExport('sequence-length')}
        >
          <SequenceLengthChart sequences={sequences} />
        </ChartCard>

        <ChartCard
          title="Sequence Type Distribution"
          onExport={() => handleExport('sequence-type')}
        >
          <SequenceTypeChart sequences={sequences} />
        </ChartCard>

        <ChartCard
          title="Quality Score Distribution"
          onExport={() => handleExport('quality-distribution')}
        >
          <QualityDistribution sequences={sequences} />
        </ChartCard>

        <ChartCard
          title="Analysis Progress"
          onExport={() => handleExport('analysis-progress')}
        >
          <div className="space-y-4">
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Analysis progress visualization</p>
              <p className="text-sm">Run some analyses to see progress charts</p>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};