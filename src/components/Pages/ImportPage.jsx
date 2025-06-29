import React, { useState } from 'react';
import { Upload, FileText, Database, AlertCircle, CheckCircle, X, Folder } from 'lucide-react';
import { useGenomeStore } from '../../store';
import { FileDropzone } from '../FileUpload/FileDropzone';

const ImportHistory = ({ imports, onRemove }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Imports</h3>
    {imports.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 text-sm">No recent imports</p>
    ) : (
      <div className="space-y-2">
        {imports.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.type} • {item.size} • {item.date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <button
                onClick={() => onRemove(index)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const ImportPage = () => {
  const { sequences, addSequence } = useGenomeStore();
  const [importHistory, setImportHistory] = useState([
    {
      name: 'sample_genome.fasta',
      type: 'FASTA',
      size: '2.3 MB',
      date: '2 hours ago',
      status: 'success'
    },
    {
      name: 'variants.vcf',
      type: 'VCF',
      size: '856 KB',
      date: '1 day ago',
      status: 'success'
    }
  ]);

  const handleRemoveImport = (index) => {
    setImportHistory(prev => prev.filter((_, i) => i !== index));
  };

  const supportedFormats = [
    { name: 'FASTA', ext: '.fasta, .fa, .fas', desc: 'Sequence data format' },
    { name: 'FASTQ', ext: '.fastq, .fq', desc: 'Sequence data with quality scores' },
    { name: 'VCF', ext: '.vcf', desc: 'Variant Call Format' },
    { name: 'GFF', ext: '.gff, .gff3', desc: 'Gene Feature Format' },
    { name: 'SAM/BAM', ext: '.sam, .bam', desc: 'Sequence Alignment Map' },
  ];

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="text-center">
        <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Data Import Center
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Import and manage your genomic data files
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* File Upload Area */}
        <div className="space-y-6">
          <FileDropzone />
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <Folder className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <div className="font-medium text-blue-900 dark:text-blue-100">Browse Files</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Select from computer</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <div className="font-medium text-green-900 dark:text-green-100">From Database</div>
                <div className="text-sm text-green-700 dark:text-green-300">Import from NCBI</div>
              </div>
            </button>
          </div>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          {/* Supported Formats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Supported Formats
            </h3>
            <div className="space-y-3">
              {supportedFormats.map((format, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{format.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{format.desc}</div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {format.ext}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Stats */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Current Data
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400">Sequences</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sequences.length}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Total Bases</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {sequences.reduce((sum, seq) => sum + seq.length, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import History */}
      <ImportHistory imports={importHistory} onRemove={handleRemoveImport} />
    </div>
  );
};