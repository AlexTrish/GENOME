import React, { useState } from 'react';
import { Search, Download, Settings, Star, Shield } from 'lucide-react';

const ExtensionCard = ({ extension, onInstall, onConfigure }) => (
  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">{extension.name[0]}</span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{extension.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{extension.author}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">{extension.rating}</span>
      </div>
    </div>
    
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{extension.description}</p>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded text-xs ${
          extension.installed 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {extension.installed ? 'Installed' : 'Available'}
        </span>
        {extension.verified && (
          <Shield className="w-4 h-4 text-blue-500" title="Verified" />
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {extension.installed ? (
          <button
            onClick={() => onConfigure(extension)}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Configure
          </button>
        ) : (
          <button
            onClick={() => onInstall(extension)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Install
          </button>
        )}
      </div>
    </div>
  </div>
);

export const ExtensionsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const extensions = [
    {
      id: 'blast-search',
      name: 'BLAST Search',
      author: 'NCBI',
      description: 'Perform BLAST searches against NCBI databases',
      rating: 4.8,
      installed: true,
      verified: true
    },
    {
      id: 'phylo-tree',
      name: 'Phylogenetic Trees',
      author: 'BioPython Team',
      description: 'Advanced phylogenetic tree construction and visualization',
      rating: 4.6,
      installed: false,
      verified: true
    },
    {
      id: 'protein-fold',
      name: 'Protein Folding',
      author: 'AlphaFold',
      description: 'Predict protein structures using AI models',
      rating: 4.9,
      installed: false,
      verified: true
    }
  ];
  
  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch = ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ext.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'installed' && ext.installed) ||
                         (filter === 'available' && !ext.installed);
    return matchesSearch && matchesFilter;
  });
  
  const handleInstall = (extension) => {
    console.log('Installing extension:', extension.name);
  };
  
  const handleConfigure = (extension) => {
    console.log('Configuring extension:', extension.name);
  };
  
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Extensions</h3>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search extensions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option value="all">All Extensions</option>
            <option value="installed">Installed</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>
      
      {/* Extensions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredExtensions.map(extension => (
          <ExtensionCard
            key={extension.id}
            extension={extension}
            onInstall={handleInstall}
            onConfigure={handleConfigure}
          />
        ))}
      </div>
    </div>
  );
};