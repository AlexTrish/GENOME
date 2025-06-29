import React, { useState } from 'react';
import { Play, Download, RotateCcw } from 'lucide-react';
import { useGenomeStore } from '../../store';
import { SequenceAlignment } from '../../modules/analysis/SequenceAlignment';
import clsx from 'clsx';

export const AlignmentTool = () => {
  const { sequences, addTask } = useGenomeStore();
  const [selectedSeq1, setSelectedSeq1] = useState('');
  const [selectedSeq2, setSelectedSeq2] = useState('');
  const [algorithm, setAlgorithm] = useState('needleman-wunsch');
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleAlignment = async () => {
    if (!selectedSeq1 || !selectedSeq2) {
      alert('Please select two sequences to align');
      return;
    }

    const seq1 = sequences.find(s => s.id === selectedSeq1);
    const seq2 = sequences.find(s => s.id === selectedSeq2);

    if (!seq1 || !seq2) {
      alert('Selected sequences not found');
      return;
    }

    setIsRunning(true);
    
    const taskId = `alignment_${Date.now()}`;
    addTask({
      id: taskId,
      name: `${algorithm} alignment: ${seq1.id} vs ${seq2.id}`,
      type: 'alignment',
      status: 'running',
      progress: 0,
      createdAt: new Date()
    });

    try {
      // Simulate progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const alignmentResult = algorithm === 'needleman-wunsch'
        ? SequenceAlignment.needlemanWunsch(seq1.sequence, seq2.sequence)
        : SequenceAlignment.smithWaterman(seq1.sequence, seq2.sequence);

      setResult(alignmentResult);
      
    } catch (error) {
      console.error('Alignment error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedSeq1('');
    setSelectedSeq2('');
  };

  const getColorForBase = (base) => {
    switch (base.toUpperCase()) {
      case 'A': return 'text-red-600 dark:text-red-400';
      case 'T': return 'text-blue-600 dark:text-blue-400';
      case 'C': return 'text-green-600 dark:text-green-400';
      case 'G': return 'text-yellow-600 dark:text-yellow-400';
      case '-': return 'text-gray-400 dark:text-gray-500';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6 enhanced-scrollbar overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sequence Alignment
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          
          {result && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Sequence
            </label>
            <select
              value={selectedSeq1}
              onChange={(e) => setSelectedSeq1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select sequence...</option>
              {sequences.map(seq => (
                <option key={seq.id} value={seq.id}>
                  {seq.id} ({seq.length} bp)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Second Sequence
            </label>
            <select
              value={selectedSeq2}
              onChange={(e) => setSelectedSeq2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select sequence...</option>
              {sequences.map(seq => (
                <option key={seq.id} value={seq.id}>
                  {seq.id} ({seq.length} bp)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Algorithm
            </label>
            <div className="space-y-2">
              {['needleman-wunsch', 'smith-waterman'].map(alg => (
                <label key={alg} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="algorithm"
                    value={alg}
                    checked={algorithm === alg}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {alg === 'needleman-wunsch' ? 'Needleman-Wunsch (Global)' : 'Smith-Waterman (Local)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleAlignment}
            disabled={!selectedSeq1 || !selectedSeq2 || isRunning}
            className={clsx(
              'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors',
              isRunning || !selectedSeq1 || !selectedSeq2
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            )}
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running Alignment...' : 'Run Alignment'}
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Alignment Results
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="font-medium text-gray-700 dark:text-gray-300">Score</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{result.score}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="font-medium text-gray-700 dark:text-gray-300">Identity</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">{result.identity.toFixed(1)}%</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="font-medium text-gray-700 dark:text-gray-300">Gaps</div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{result.gaps}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="font-medium text-gray-700 dark:text-gray-300">Algorithm</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {result.algorithm.replace('-', ' ')}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 code-scrollbar overflow-x-auto max-h-64">
                <div className="space-y-1">
                  <div className="text-gray-600 dark:text-gray-400">Sequence 1:</div>
                  <div className="whitespace-pre">
                    {result.aligned1.split('').map((base, index) => (
                      <span key={index} className={getColorForBase(base)}>{base}</span>
                    ))}
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-400 mt-2">Sequence 2:</div>
                  <div className="whitespace-pre">
                    {result.aligned2.split('').map((base, index) => (
                      <span key={index} className={getColorForBase(base)}>{base}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};