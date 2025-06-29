import React, { useState } from 'react';
import { Eye, ZoomIn, ZoomOut, Move, Ruler, Bookmark, Download, Settings } from 'lucide-react';

const GenomeTrack = ({ name, data, color, height = 60 }) => (
  <div className="border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800">
      <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
      <div className="flex items-center gap-1">
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <Settings className="w-3 h-3" />
        </button>
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <Download className="w-3 h-3" />
        </button>
      </div>
    </div>
    <div 
      className="relative bg-white dark:bg-gray-900 border-l-4"
      style={{ height: `${height}px`, borderLeftColor: color }}
    >
      {/* Mock visualization */}
      <div className="absolute inset-0 p-2">
        <div className="h-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-50 rounded"></div>
        {data && data.map((item, index) => (
          <div
            key={index}
            className="absolute top-2 h-4 rounded"
            style={{
              left: `${item.start}%`,
              width: `${item.end - item.start}%`,
              backgroundColor: color
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const GenomeBrowserPage = () => {
  const [currentRegion, setCurrentRegion] = useState('chr1:1,000,000-2,000,000');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTracks, setSelectedTracks] = useState(['genes', 'variants', 'coverage']);

  const availableTracks = [
    { id: 'genes', name: 'Gene Annotations', color: '#3b82f6', data: [
      { start: 10, end: 30 }, { start: 45, end: 65 }, { start: 80, end: 95 }
    ]},
    { id: 'variants', name: 'Variants', color: '#ef4444', data: [
      { start: 15, end: 16 }, { start: 35, end: 36 }, { start: 70, end: 71 }
    ]},
    { id: 'coverage', name: 'Read Coverage', color: '#10b981', height: 80 },
    { id: 'repeats', name: 'Repeat Elements', color: '#f59e0b', data: [
      { start: 25, end: 40 }, { start: 60, end: 75 }
    ]},
    { id: 'conservation', name: 'Conservation', color: '#8b5cf6', height: 40 },
  ];

  const handleTrackToggle = (trackId) => {
    setSelectedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleZoom = (direction) => {
    setZoomLevel(prev => direction === 'in' ? prev * 2 : prev / 2);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <Eye className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Genome Browser
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Interactive genomic data visualization
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Region:</label>
              <input
                type="text"
                value={currentRegion}
                onChange={(e) => setCurrentRegion(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                placeholder="chr1:1000000-2000000"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleZoom('out')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400 px-2">
                {zoomLevel}x
              </span>
              <button
                onClick={() => handleZoom('in')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Bookmark className="w-4 h-4" />
              Bookmark
            </button>
            <button className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Track Selection Panel */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tracks</h3>
          <div className="space-y-2">
            {availableTracks.map(track => (
              <label key={track.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTracks.includes(track.id)}
                  onChange={() => handleTrackToggle(track.id)}
                  className="rounded"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: track.color }}
                  />
                  <span className="text-sm text-gray-900 dark:text-white">{track.name}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Quick Navigation</h4>
            <div className="space-y-1">
              {['chr1:1M-2M', 'chr2:5M-6M', 'chrX:10M-11M'].map(region => (
                <button
                  key={region}
                  onClick={() => setCurrentRegion(region)}
                  className="w-full text-left px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Browser View */}
        <div className="flex-1 flex flex-col">
          {/* Ruler */}
          <div className="h-8 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
            <Ruler className="w-4 h-4 text-gray-500 mr-2" />
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>1,000,000</span>
                <span>1,250,000</span>
                <span>1,500,000</span>
                <span>1,750,000</span>
                <span>2,000,000</span>
              </div>
            </div>
          </div>

          {/* Tracks */}
          <div className="flex-1 overflow-y-auto enhanced-scrollbar">
            {selectedTracks.map(trackId => {
              const track = availableTracks.find(t => t.id === trackId);
              return track ? (
                <GenomeTrack
                  key={track.id}
                  name={track.name}
                  data={track.data}
                  color={track.color}
                  height={track.height}
                />
              ) : null;
            })}
            
            {selectedTracks.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select tracks to display genomic data</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};