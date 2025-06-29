import React, { useState } from 'react';
import { Microscope, Play, Settings, BarChart3, Download, RotateCcw } from 'lucide-react';
import { AlignmentTool } from '../Analysis/AlignmentTool';

const AlignmentPresets = ({ onSelectPreset }) => {
  const presets = [
    {
      name: 'DNA Sequences',
      algorithm: 'needleman-wunsch',
      match: 2,
      mismatch: -1,
      gap: -1,
      description: 'Optimized for DNA sequence alignment'
    },
    {
      name: 'Protein Sequences',
      algorithm: 'smith-waterman',
      match: 3,
      mismatch: -2,
      gap: -1,
      description: 'Best for protein sequence comparison'
    },
    {
      name: 'RNA Sequences',
      algorithm: 'needleman-wunsch',
      match: 2,
      mismatch: -1,
      gap: -2,
      description: 'Specialized for RNA alignment'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Presets</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onSelectPreset(preset)}
            className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="font-medium text-gray-900 dark:text-white mb-1">{preset.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{preset.description}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {preset.algorithm} • Match: {preset.match} • Gap: {preset.gap}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const AlignmentHistory = ({ alignments }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Alignments</h3>
    {alignments.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 text-sm">No alignments performed yet</p>
    ) : (
      <div className="space-y-3">
        {alignments.map((alignment, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900 dark:text-white">
                {alignment.seq1} vs {alignment.seq2}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{alignment.date}</span>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Score: </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">{alignment.score}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Identity: </span>
                <span className="font-medium text-green-600 dark:text-green-400">{alignment.identity}%</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Algorithm: </span>
                <span className="font-medium text-gray-900 dark:text-white">{alignment.algorithm}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const AlignmentPage = () => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [alignmentHistory] = useState([
    {
      seq1: 'sequence_1',
      seq2: 'sequence_2',
      score: 245,
      identity: 87.5,
      algorithm: 'Needleman-Wunsch',
      date: '2 hours ago'
    },
    {
      seq1: 'genome_A',
      seq2: 'genome_B',
      score: 189,
      identity: 92.1,
      algorithm: 'Smith-Waterman',
      date: '1 day ago'
    }
  ]);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="text-center">
        <Microscope className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sequence Alignment
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Compare and align DNA, RNA, and protein sequences
        </p>
      </div>

      <AlignmentPresets onSelectPreset={setSelectedPreset} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AlignmentTool />
        </div>
        
        <div className="space-y-6">
          <AlignmentHistory alignments={alignmentHistory} />
          
          {/* Quick Stats */}
          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Alignment Statistics
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Alignments:</span>
                <span className="font-medium text-gray-900 dark:text-white">{alignmentHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Avg Identity:</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {alignmentHistory.length > 0 
                    ? (alignmentHistory.reduce((sum, a) => sum + a.identity, 0) / alignmentHistory.length).toFixed(1)
                    : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Best Score:</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {alignmentHistory.length > 0 ? Math.max(...alignmentHistory.map(a => a.score)) : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};