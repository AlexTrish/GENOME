import { create } from 'zustand';

export const useGenomeStore = create((set, get) => ({
  // Project Management
  currentProject: null,
  projects: [],
  isProjectInitialized: false,
  
  // File Management
  sequences: [],
  vcfRecords: [],
  currentFile: null,
  
  // Analysis
  tasks: [],
  
  // Tab System
  openTabs: [
    {
      id: 'welcome_tab',
      title: 'Welcome',
      type: 'welcome',
      content: null,
      isDirty: false
    }
  ],
  activeTab: 'welcome_tab',
  
  // UI State
  theme: 'dark',
  sidebarOpen: true,
  activeSidebarPanel: null,
  bottomPanelOpen: false,
  activeBottomTab: 'console',
  
  // Settings - загружаем из localStorage или используем значения по умолчанию
  settings: (() => {
    try {
      const saved = localStorage.getItem('genomeSettings');
      return saved ? JSON.parse(saved) : {
        fontSize: 'medium',
        highContrast: false,
        reducedMotion: false,
        enableAnimations: true,
        notifications: true,
        autoSave: true,
        showQualityScores: false,
        language: 'en',
        maxMemoryUsage: '4GB',
        cacheSize: '1GB',
        autoUpdate: true,
        telemetry: false
      };
    } catch {
      return {
        fontSize: 'medium',
        highContrast: false,
        reducedMotion: false,
        enableAnimations: true,
        notifications: true,
        autoSave: true,
        showQualityScores: false,
        language: 'en',
        maxMemoryUsage: '4GB',
        cacheSize: '1GB',
        autoUpdate: true,
        telemetry: false
      };
    }
  })(),
  
  // Window State
  isMaximized: false,
  
  // Tab Actions
  addTab: (tab) => set((state) => {
    const existingTab = state.openTabs.find(t => 
      t.type === tab.type && 
      (tab.content ? t.content?.id === tab.content?.id : true)
    );
    
    if (existingTab) {
      return { activeTab: existingTab.id };
    }
    
    const newTab = {
      ...tab,
      isDirty: tab.isDirty || false
    };
    
    return {
      openTabs: [...state.openTabs, newTab],
      activeTab: newTab.id
    };
  }),
  
  closeTab: (tabId) => set((state) => {
    const newTabs = state.openTabs.filter(tab => tab.id !== tabId);
    
    // Always keep at least one tab
    if (newTabs.length === 0) {
      newTabs.push({
        id: 'welcome_tab_new',
        title: 'Welcome',
        type: 'welcome',
        content: null,
        isDirty: false
      });
    }
    
    let newActiveTab = state.activeTab;
    if (state.activeTab === tabId) {
      // Find the tab to the right, or leftmost if closing the rightmost
      const closedIndex = state.openTabs.findIndex(tab => tab.id === tabId);
      if (closedIndex < newTabs.length) {
        newActiveTab = newTabs[closedIndex].id;
      } else {
        newActiveTab = newTabs[newTabs.length - 1].id;
      }
    }
    
    return {
      openTabs: newTabs,
      activeTab: newActiveTab
    };
  }),
  
  setActiveTab: (tabId) => set({ activeTab: tabId }),
  
  updateTab: (tabId, updates) => set((state) => ({
    openTabs: state.openTabs.map(tab =>
      tab.id === tabId ? { ...tab, ...updates } : tab
    )
  })),
  
  reorderTabs: (fromIndex, toIndex) => set((state) => {
    const newTabs = [...state.openTabs];
    const [movedTab] = newTabs.splice(fromIndex, 1);
    newTabs.splice(toIndex, 0, movedTab);
    return { openTabs: newTabs };
  }),
  
  // Sidebar Actions
  setActiveSidebarPanel: (panelId) => set((state) => {
    // If clicking the same panel, toggle it off
    if (state.activeSidebarPanel === panelId) {
      return { activeSidebarPanel: null };
    }
    
    // Create new tab for the panel
    const { addTab } = get();
    addTab({
      id: `${panelId}_${Date.now()}`,
      title: panelId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      type: panelId,
      content: null,
      isDirty: false
    });
    
    return { activeSidebarPanel: panelId };
  }),
  
  // Project Actions
  createProject: (projectData) => set((state) => {
    const newProject = {
      id: Date.now().toString(),
      name: projectData.name,
      description: projectData.description,
      type: projectData.type,
      createdAt: new Date(),
      lastModified: new Date(),
      path: projectData.path || null
    };
    
    return {
      currentProject: newProject,
      projects: [...state.projects, newProject],
      isProjectInitialized: true
    };
  }),
  
  openProject: (project) => set({
    currentProject: project,
    isProjectInitialized: true
  }),
  
  closeProject: () => set({
    currentProject: null,
    isProjectInitialized: false,
    sequences: [],
    vcfRecords: [],
    tasks: []
  }),
  
  saveProject: async (project) => {
    console.log('Saving project:', project.name);
    set((state) => ({
      projects: state.projects.map(p => 
        p.id === project.id 
          ? { ...p, lastModified: new Date() }
          : p
      )
    }));
  },
  
  exportProject: async (project) => {
    const state = get();
    const exportData = {
      project,
      sequences: state.sequences,
      vcfRecords: state.vcfRecords,
      tasks: state.tasks.filter(t => t.status === 'completed')
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}-export.genome`;
    a.click();
    URL.revokeObjectURL(url);
  },
  
  importData: async (file) => {
    const extension = file.name.toLowerCase().split('.').pop();
    console.log(`Importing ${extension} file:`, file.name);
  },
  
  // Data Actions
  addSequence: (sequence) =>
    set((state) => ({
      sequences: [...state.sequences, sequence],
    })),

  removeSequence: (id) =>
    set((state) => ({
      sequences: state.sequences.filter((seq) => seq.id !== id),
    })),

  addVCFRecords: (records) =>
    set((state) => ({
      vcfRecords: [...state.vcfRecords, ...records],
    })),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),

  // UI Actions - исправленная функция смены темы
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    
    // Применяем тему немедленно
    const root = document.documentElement;
    
    // Удаляем все классы тем
    root.classList.remove('dark', 'light');
    
    // Применяем новую тему
    switch (newTheme) {
      case 'light':
        root.classList.add('light');
        root.style.setProperty('--primary-color', '#3b82f6');
        root.style.setProperty('--primary-dark', '#2563eb');
        break;
      case 'dark':
        root.classList.add('dark');
        root.style.setProperty('--primary-color', '#3b82f6');
        root.style.setProperty('--primary-dark', '#2563eb');
        break;
      case 'auto':
        // Определяем системную тему
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        } else {
          root.classList.add('light');
        }
        root.style.setProperty('--primary-color', '#3b82f6');
        root.style.setProperty('--primary-dark', '#2563eb');
        break;
      case 'blue':
        root.classList.add('dark');
        root.style.setProperty('--primary-color', '#2563eb');
        root.style.setProperty('--primary-dark', '#1d4ed8');
        break;
      case 'green':
        root.classList.add('dark');
        root.style.setProperty('--primary-color', '#059669');
        root.style.setProperty('--primary-dark', '#047857');
        break;
      case 'purple':
        root.classList.add('dark');
        root.style.setProperty('--primary-color', '#7c3aed');
        root.style.setProperty('--primary-dark', '#6d28d9');
        break;
      default:
        root.classList.add('dark');
        root.style.setProperty('--primary-color', '#3b82f6');
        root.style.setProperty('--primary-dark', '#2563eb');
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('genomeTheme', newTheme);
  },
  
  // Исправленная функция обновления настроек с мгновенным применением
  updateSettings: (newSettings) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      
      // Сохраняем в localStorage немедленно
      localStorage.setItem('genomeSettings', JSON.stringify(updatedSettings));
      
      // Применяем настройки к DOM немедленно
      const root = document.documentElement;
      
      // Применяем размер шрифта
      root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
      switch (updatedSettings.fontSize) {
        case 'small':
          root.classList.add('text-sm');
          break;
        case 'medium':
          root.classList.add('text-base');
          break;
        case 'large':
          root.classList.add('text-lg');
          break;
        case 'extra-large':
          root.classList.add('text-xl');
          break;
        default:
          root.classList.add('text-base');
      }

      // Применяем высокий контраст
      if (updatedSettings.highContrast) {
        root.classList.add('high-contrast');
      } else {
        root.classList.remove('high-contrast');
      }

      // Применяем уменьшенное движение
      if (updatedSettings.reducedMotion) {
        root.classList.add('reduce-motion');
      } else {
        root.classList.remove('reduce-motion');
      }
      
      return { settings: updatedSettings };
    });
  },
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleBottomPanel: () => set((state) => ({ bottomPanelOpen: !state.bottomPanelOpen })),
  setActiveBottomTab: (tab) => set({ activeBottomTab: tab }),
  setMaximized: (maximized) => set({ isMaximized: maximized }),

  clearAll: () =>
    set({
      sequences: [],
      vcfRecords: [],
      tasks: [],
      currentFile: null,
    }),
}));