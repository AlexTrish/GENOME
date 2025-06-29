import React, { useState } from 'react';
import { Activity, Search, Filter, BarChart3, Download, AlertTriangle } from 'lucide-react';
import { useGenomeStore } from '../../store';

const MutationCard = ({ mutation, onSelect }) => (
  <div 
    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => onSelect(mutation)}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">
        {mutation.chrom}:{mutation.pos}
      </div>
      <div className={`px-2 py-1 rounded text-xs font-medium ${
        mutation.type === 'SNP' 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      }`}>
        {mutation.type}
      </div>
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
      {mutation.ref} → {mutation.alt}
    </div>
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>Quality: {mutation.qual}</span>
      <span>{mutation.filter}</span>
    </div>
  </div>
);

const MutationStats = ({ mutations }) => {
  const snps = mutations.filter(m => m.type === 'SNP').length;
  const indels = mutations.filter(m => m.type === 'INDEL').length;
  const avgQuality = mutations.length > 0 
    ? (mutations.reduce((sum, m) => sum + m.qual, 0) / mutations.length).toFixed(1)
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mutations.length}</div>
        <div className="text-sm text-blue-700 dark:text-blue-300">Total Variants</div>
      </div>
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{snps}</div>
        <div className="text-sm text-green-700 dark:text-green-300">SNPs</div>
      </div>
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{indels}</div>
        <div className="text-sm text-orange-700 dark:text-orange-300">INDELs</div>
      </div>
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{avgQuality}</div>
        <div className="text-sm text-purple-700 dark:text-purple-300">Avg Quality</div>
      </div>
    </div>
  );
};

export const MutationsPage = () => {
  const { vcfRecords } = useGenomeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedMutation, setSelectedMutation] = useState(null);

  // Mock mutations data if no VCF records
  const mockMutations = [
    { chrom: 'chr1', pos: 12345, ref: 'A', alt: 'T', qual: 60, filter: 'PASS', type: 'SNP' },
    { chrom: 'chr2', pos: 67890, ref: 'GTC', alt: 'G', qual: 45, filter: 'PASS', type: 'INDEL' },
    { chrom: 'chr3', pos: 11111, ref: 'C', alt: 'G', qual: 55, filter: 'PASS', type: 'SNP' },
  ];

  const mutations = vcfRecords.length > 0 
    ? vcfRecords.map(record => ({
        ...record,
        type: record.ref.length === 1 && record.alt.length === 1 ? 'SNP' : 'INDEL'
      }))
    : mockMutations;

  const filteredMutations = mutations.filter(mutation => {
    const matchesSearch = mutation.chrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mutation.pos.toString().includes(searchTerm);
    const matchesFilter = filterType === 'all' || mutation.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="text-center">
        <Activity className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mutation Analysis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Analyze genetic variants and mutations
        </p>
      </div>

      <MutationStats mutations={mutations} />

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by chromosome or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Types</option>
          <option value="SNP">SNPs</option>
          <option value="INDEL">INDELs</option>
        </select>

        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mutations List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Variants ({filteredMutations.length})
          </h2>
          
          {filteredMutations.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
              <p>No mutations found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto enhanced-scrollbar">
              {filteredMutations.map((mutation, index) => (
                <MutationCard
                  key={index}
                  mutation={mutation}
                  onSelect={setSelectedMutation}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mutation Details */}
        <div className="space-y-6">
          {selectedMutation ? (
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Mutation Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Position:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {selectedMutation.chrom}:{selectedMutation.pos}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Change:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {selectedMutation.ref} → {selectedMutation.alt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMutation.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMutation.qual}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Filter:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedMutation.filter}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <Activity className="w-12 h-12 mx-auto mb-4" />
              <p>Select a mutation to view details</p>
            </div>
          )}

          {/* Analysis Tools */}
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Analysis Tools
            </h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Pathogenicity Prediction
              </button>
              <button className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Population Frequency
              </button>
              <button className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Functional Annotation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};