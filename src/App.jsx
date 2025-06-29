import React, { useEffect } from 'react';
import { TitleBar } from './components/Layout/TitleBar';
import { TabBar } from './components/Layout/TabBar';
import { Sidebar } from './components/Layout/Sidebar';
import { BottomPanel } from './components/Layout/BottomPanel';
import { MainContent } from './components/MainContent';
import { useGenomeStore } from './store';

function App() {
  const { theme, settings } = useGenomeStore();

  useEffect(() => {
    // Загружаем сохранённую тему при запуске
    const savedTheme = localStorage.getItem('genomeTheme');
    if (savedTheme) {
      const { setTheme } = useGenomeStore.getState();
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <TitleBar />
      <TabBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default App;