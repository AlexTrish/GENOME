import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  Search, 
  Plus, 
  RefreshCw,
  MoreHorizontal,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useGenomeStore } from '../../store';

const FileTreeItem = ({ item, level = 0, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded`}
        style={{ paddingLeft: `${8 + level * 16}px` }}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          } else {
            onSelect(item);
          }
        }}
      >
        {hasChildren ? (
          isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          <div className="w-4" />
        )}
        
        {item.type === 'folder' ? (
          isExpanded ? <FolderOpen className="w-4 h-4 text-blue-500" /> : <Folder className="w-4 h-4 text-blue-500" />
        ) : (
          <FileText className="w-4 h-4 text-gray-500" />
        )}
        
        <span className="truncate">{item.name}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem
              key={index}
              item={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileBrowserPanel = () => {
  const { sequences, addTab } = useGenomeStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const fileTree = [
    {
      name: 'Project Files',
      type: 'folder',
      children: [
        {
          name: 'Sequences',
          type: 'folder',
          children: sequences.map(seq => ({
            name: `${seq.id}.fasta`,
            type: 'file',
            data: seq
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
      ]
    }
  ];
  
  const handleFileSelect = (item) => {
    if (item.type === 'file' && item.data) {
      addTab({
        id: `file_${item.data.id}_${Date.now()}`,
        title: item.name,
        type: 'sequence-viewer',
        content: item.data
      });
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">File Browser</h3>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {fileTree.map((item, index) => (
          <FileTreeItem
            key={index}
            item={item}
            onSelect={handleFileSelect}
          />
        ))}
      </div>
    </div>
  );
};