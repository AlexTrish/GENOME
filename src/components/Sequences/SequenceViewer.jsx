import React, { useState } from 'react';
import { Search, Copy, Download, Eye, EyeOff } from 'lucide-react';
import { useGenomeStore } from '../../store';
import clsx from 'clsx';

const SequenceRow = ({ sequence, searchTerm, showQuality }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getColorForBase = (base) => {
    switch (base.toUpperCase()) {
      case 'A': return 'text-red-600 dark:text-red-400';
      case 'T': return 'text-blue-600 dark:text-blue-400';
      case 'C': return 'text-green-600 dark:text-green-400';
      case 'G': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-500 dark:text-gray-500';
    }
  };

  const displaySequence = expanded ? sequence.sequence : sequence.sequence.substring(0, 100);
  const displayQuality = expanded && sequence.quality ? sequence.quality : sequence.quality?.substring(0, 100);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-mono font-semibold text-gray-900 dark:text-white">
            {sequence.id}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {sequence.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Length: {sequence.length.toLocaleString()} bp</span>
            <span>Type: {sequence.type}</span>
            {sequence.quality && <span>Quality: Available</span>}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(sequence.sequence)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Copy sequence"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded border sequence-scrollbar overflow-x-auto max-h-32">
          <div className="whitespace-pre-wrap break-all">
            {displaySequence.split('').map((base, index) => (
              <span key={index} className={getColorForBase(base)}>
                {base}
              </span>
            ))}
          </div>
        </div>
        
        {showQuality && sequence.quality && (
          <div className="font-mono text-xs bg-blue-50 dark:bg-blue-900/20 p-3 rounded border sequence-scrollbar overflow-x-auto max-h-24">
            <div className="text-blue-700 dark:text-blue-300 mb-1">Quality Scores:</div>
            <div className="whitespace-pre-wrap break-all text-blue-600 dark:text-blue-400">
              {displayQuality}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {expanded ? 'Show less' : `Show full sequence (${sequence.length - 100} more bases)`}
        </button>
      </div>
    </div>
  );
};

export const SequenceViewer = () => {
  const { sequences } = useGenomeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuality, setShowQuality] = useState(false);

  const filteredSequences = sequences.filter(seq =>
    seq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seq.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seq.sequence.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 enhanced-scrollbar overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sequences ({sequences.length})
        </h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowQuality(!showQuality)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
              showQuality
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            {showQuality ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            Quality Scores
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search sequences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {filteredSequences.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {sequences.length === 0 ? (
              <p>No sequences loaded. Upload some genomic files to get started.</p>
            ) : (
              <p>No sequences match your search criteria.</p>
            )}
          </div>
        ) : (
          filteredSequences.map((sequence) => (
            <SequenceRow
              key={sequence.id}
              sequence={sequence}
              searchTerm={searchTerm}
              showQuality={showQuality}
            />
          ))
        )}
      </div>
    </div>
  );
};