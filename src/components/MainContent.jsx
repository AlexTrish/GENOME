import React from 'react';
import { useGenomeStore } from '../store';
import { WelcomeScreen } from './Welcome/WelcomeScreen';
import { FileDropzone } from './FileUpload/FileDropzone';
import { SequenceViewer } from './Sequences/SequenceViewer';
import { AlignmentTool } from './Analysis/AlignmentTool';
import { FileBrowserPanel } from './Panels/FileBrowserPanel';
import { ExtensionsPanel } from './Panels/ExtensionsPanel';
import { SettingsPage } from './Pages/SettingsPage';

// Import existing pages
import { ImportPage } from './Pages/ImportPage';
import { AlignmentPage } from './Pages/AlignmentPage';
import { MutationsPage } from './Pages/MutationsPage';
import { GenomeBrowserPage } from './Pages/GenomeBrowserPage';
import { ChartsPage } from './Pages/ChartsPage';
import { PerformancePage } from './Pages/PerformancePage';

export const MainContent = () => {
  const { openTabs, activeTab, updateTab } = useGenomeStore();

  const getCurrentTab = () => {
    return openTabs.find(tab => tab.id === activeTab);
  };

  const markTabDirty = (tabId) => {
    updateTab(tabId, { isDirty: true });
  };

  const renderTabContent = (tab) => {
    if (!tab) return <WelcomeScreen />;

    switch (tab.type) {
      case 'welcome':
        return <WelcomeScreen />;
      
      case 'file-browser':
        return <FileBrowserPanel />;
      
      case 'extensions':
        return <ExtensionsPanel />;
      
      case 'network':
        return (
          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🕸️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Network Analysis
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Visualize and analyze biological networks
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Network visualization tools will be available here.
              </p>
            </div>
          </div>
        );
      
      case 'database':
        return (
          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🗄️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Database Management
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Manage and query genomic databases
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Database management tools will be available here.
              </p>
            </div>
          </div>
        );
      
      case 'settings':
        return <SettingsPage />;

      case 'sequence-viewer':
        return tab.content ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tab.content.id}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Length: {tab.content.length} bp | Type: {tab.content.type}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-x-auto max-h-96">
                {tab.content.sequence.split('').map((base, index) => (
                  <span key={index} className={
                    base === 'A' ? 'text-red-600 dark:text-red-400' :
                    base === 'T' ? 'text-blue-600 dark:text-blue-400' :
                    base === 'C' ? 'text-green-600 dark:text-green-400' :
                    base === 'G' ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500'
                  }>
                    {base}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : <div className="p-6 text-center text-gray-500 dark:text-gray-400">No content available</div>;
      
      // Legacy content types
      case 'import':
        return <ImportPage />;
      case 'sequences':
        return <SequenceViewer />;
      case 'alignment':
        return <AlignmentPage />;
      case 'mutations':
        return <MutationsPage />;
      case 'genome-browser':
        return <GenomeBrowserPage />;
      case 'charts':
        return <ChartsPage />;
      case 'performance':
        return <PerformancePage />;
      
      default:
        return <WelcomeScreen />;
    }
  };

  const currentTab = getCurrentTab();

  return (
    <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 min-w-0">
      {renderTabContent(currentTab)}
    </main>
  );
};