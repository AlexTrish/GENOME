import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FileText, 
  Database, 
  MoreHorizontal, 
  Plus, 
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  Eye,
  Download,
  Trash2,
  Copy
} from 'lucide-react';
import { useGenomeStore } from '../../store';
import clsx from 'clsx';

const FileTreeItem = ({ item, level = 0, onSelect, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const hasChildren = item.children && item.children.length > 0;
  
  const handleAction = (action, e) => {
    e.stopPropagation();
    onAction(action, item);
  };
  
  return (
    <div>
      <div
        className={clsx(
          'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-700/50 text-gray-300 rounded-lg mx-1 group',
          level > 0 && 'ml-4'
        )}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          } else {
            onSelect(item);
          }
        }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {hasChildren ? (
          isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />
        ) : (
          <div className="w-4" />
        )}
        
        {item.type === 'folder' ? (
          isExpanded ? <FolderOpen className="w-4 h-4 text-blue-400" /> : <Folder className="w-4 h-4 text-blue-400" />
        ) : item.type === 'sequence' ? (
          <FileText className="w-4 h-4 text-green-400" />
        ) : (
          <Database className="w-4 h-4 text-purple-400" />
        )}
        
        <span className="truncate flex-1">{item.name}</span>
        
        {item.type === 'sequence' && (
          <span className="text-xs text-gray-500">
            {item.length} bp
          </span>
        )}
        
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => handleAction('view', e)}
              className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white"
              title="View"
            >
              <Eye className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => handleAction('copy', e)}
              className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white"
              title="Copy"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => handleAction('download', e)}
              className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white"
              title="Download"
            >
              <Download className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => handleAction('delete', e)}
              className="p-1 hover:bg-red-600 rounded text-gray-400 hover:text-white"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem
              key={index}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Explorer = () => {
  const { sequences, vcfRecords, currentProject, explorerOpen, removeSequence, setActiveTab } = useGenomeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');
  
  if (!explorerOpen) return null;
  
  const fileTree = [
    {
      name: 'Sequences',
      type: 'folder',
      children: sequences
        .filter(seq => 
          filterType === 'all' || seq.type.toLowerCase() === filterType
        )
        .filter(seq => 
          seq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seq.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          switch (sortBy) {
            case 'name': return a.id.localeCompare(b.id);
            case 'length': return b.length - a.length;
            case 'type': return a.type.localeCompare(b.type);
            default: return 0;
          }
        })
        .map(seq => ({
          name: seq.id,
          type: 'sequence',
          length: seq.length,
          data: seq
        }))
    },
    {
      name: 'Variants',
      type: 'folder',
      children: vcfRecords.map((record, index) => ({
        name: `${record.chrom}:${record.pos}`,
        type: 'variant',
        data: record
      }))
    },
    {
      name: 'Analysis Results',
      type: 'folder',
      children: []
    },
    {
      name: 'Exports',
      type: 'folder',
      children: []
    }
  ];
  
  const handleFileSelect = (item) => {
    if (item.type === 'sequence') {
      setActiveTab('sequences');
    } else if (item.type === 'variant') {
      setActiveTab('mutations');
    }
    console.log('Selected file:', item);
  };
  
  const handleFileAction = (action, item) => {
    switch (action) {
      case 'view':
        handleFileSelect(item);
        break;
      case 'copy':
        if (item.data && item.data.sequence) {
          navigator.clipboard.writeText(item.data.sequence);
        }
        break;
      case 'download':
        // Implement download functionality
        console.log('Downloading:', item.name);
        break;
      case 'delete':
        if (item.type === 'sequence' && item.data) {
          removeSequence(item.data.id);
        }
        break;
      default:
        break;
    }
  };
  
  const handleNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      console.log('Creating folder:', folderName);
    }
  };
  
  const handleRefresh = () => {
    console.log('Refreshing explorer...');
  };
  
  return (
    <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Project Explorer</h2>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleNewFolder}
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title="New Folder"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={handleRefresh}
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="length">Sort by Length</option>
            <option value="type">Sort by Type</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="dna">DNA</option>
            <option value="rna">RNA</option>
            <option value="protein">Protein</option>
          </select>
        </div>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2 enhanced-scrollbar">
        {currentProject ? (
          <div>
            <div className="text-xs font-medium text-gray-400 mb-3 px-2 uppercase tracking-wide">
              {currentProject.name}
            </div>
            
            {fileTree.map((item, index) => (
              <FileTreeItem
                key={index}
                item={item}
                onSelect={handleFileSelect}
                onAction={handleFileAction}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            <Folder className="w-12 h-12 mx-auto mb-2 text-gray-600" />
            <p>No project opened</p>
            <p className="text-xs mt-1">Create or open a project to start</p>
          </div>
        )}
      </div>
      
      {/* Footer Stats */}
      <div className="border-t border-gray-700 p-3">
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Sequences:</span>
            <span className="text-green-400">{sequences.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Variants:</span>
            <span className="text-purple-400">{vcfRecords.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};