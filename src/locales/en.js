export const en = {
  // Navigation & UI
  nav: {
    welcome: 'Welcome',
    fileBrowser: 'File Browser',
    extensions: 'Extensions',
    network: 'Network',
    database: 'Database',
    settings: 'Settings',
    sequences: 'Sequences',
    analysis: 'Analysis',
    mutations: 'Mutations',
    phylogeny: 'Phylogeny',
    visualization: 'Visualization',
    reports: 'Reports'
  },

  // Welcome Screen
  welcome: {
    title: 'Welcome to GENOME',
    subtitle: 'Advanced Bioinformatics Analysis Suite',
    quickStart: 'Quick Start',
    newProject: 'New Project',
    newProjectDesc: 'Start a new analysis',
    openProject: 'Open Project',
    openProjectDesc: 'Continue existing work',
    quickActions: 'Quick Actions',
    importFasta: 'Import FASTA Files',
    importFastaDesc: 'Load DNA/RNA sequences for analysis',
    sequenceAlignment: 'Sequence Alignment',
    sequenceAlignmentDesc: 'Compare and align sequences',
    variantAnalysis: 'Variant Analysis',
    variantAnalysisDesc: 'Analyze mutations and variants',
    recentProjects: 'Recent Projects',
    noRecentProjects: 'No recent projects',
    resources: 'Resources',
    gettingStarted: 'Getting Started Guide',
    documentation: 'Documentation',
    sampleData: 'Sample Data',
    createProject: 'Create New Project',
    projectName: 'Project Name',
    projectDescription: 'Description (Optional)',
    projectType: 'Project Type',
    generalAnalysis: 'General Analysis',
    generalAnalysisDesc: 'Multi-purpose genomic analysis workspace',
    sequenceAnalysisType: 'Sequence Analysis',
    sequenceAnalysisDesc: 'Focus on DNA/RNA sequence analysis and alignment',
    variantAnalysisType: 'Variant Analysis',
    variantAnalysisDesc: 'Specialized for mutation and variant calling',
    comparativeGenomics: 'Comparative Genomics',
    comparativeGenomicsDesc: 'Compare genomes and phylogenetic analysis'
  },

  // File Management
  files: {
    browser: 'File Browser',
    search: 'Search files...',
    newFolder: 'New Folder',
    refresh: 'Refresh',
    projectFiles: 'Project Files',
    analysisResults: 'Analysis Results',
    exports: 'Exports',
    noFiles: 'No files found',
    upload: 'Upload Files',
    import: 'Import Data',
    export: 'Export Data',
    supportedFormats: 'Supported Formats',
    fastaFormat: 'FASTA sequence files',
    fastqFormat: 'FASTQ sequence files',
    vcfFormat: 'Variant Call Format files',
    gffFormat: 'Gene Feature Format files',
    samFormat: 'Sequence Alignment Map files',
    bamFormat: 'Binary Alignment Map files',
    dropFiles: 'Drag & drop genomic files here',
    browseFiles: 'or click to browse files',
    recentImports: 'Recent Imports',
    currentData: 'Current Data',
    totalBases: 'Total Bases'
  },

  // Sequences
  sequences: {
    title: 'Sequences',
    viewer: 'Sequence Viewer',
    search: 'Search sequences...',
    length: 'Length',
    type: 'Type',
    quality: 'Quality',
    qualityScores: 'Quality Scores',
    showQuality: 'Show Quality Scores',
    hideQuality: 'Hide Quality Scores',
    copySequence: 'Copy sequence',
    downloadSequence: 'Download sequence',
    showMore: 'Show full sequence',
    showLess: 'Show less',
    noSequences: 'No sequences loaded. Upload some genomic files to get started.',
    noMatches: 'No sequences match your search criteria.',
    dnaType: 'DNA',
    rnaType: 'RNA',
    proteinType: 'Protein',
    basePairs: 'bp',
    qualityAvailable: 'Quality: Available'
  },

  // Analysis
  analysis: {
    title: 'Analysis',
    alignment: 'Sequence Alignment',
    alignmentDesc: 'Compare and align DNA, RNA, and protein sequences',
    firstSequence: 'First Sequence',
    secondSequence: 'Second Sequence',
    selectSequence: 'Select sequence...',
    algorithm: 'Algorithm',
    needlemanWunsch: 'Needleman-Wunsch (Global)',
    smithWaterman: 'Smith-Waterman (Local)',
    runAlignment: 'Run Alignment',
    runningAlignment: 'Running Alignment...',
    alignmentResults: 'Alignment Results',
    score: 'Score',
    identity: 'Identity',
    gaps: 'Gaps',
    reset: 'Reset',
    export: 'Export',
    quickPresets: 'Quick Presets',
    dnaSequences: 'DNA Sequences',
    dnaSequencesDesc: 'Optimized for DNA sequence alignment',
    proteinSequences: 'Protein Sequences',
    proteinSequencesDesc: 'Best for protein sequence comparison',
    rnaSequences: 'RNA Sequences',
    rnaSequencesDesc: 'Specialized for RNA alignment',
    recentAlignments: 'Recent Alignments',
    noAlignments: 'No alignments performed yet',
    alignmentStats: 'Alignment Statistics',
    totalAlignments: 'Total Alignments',
    avgIdentity: 'Avg Identity',
    bestScore: 'Best Score'
  },

  // Mutations
  mutations: {
    title: 'Mutation Analysis',
    subtitle: 'Analyze genetic variants and mutations',
    totalVariants: 'Total Variants',
    snps: 'SNPs',
    indels: 'INDELs',
    avgQuality: 'Avg Quality',
    searchVariants: 'Search by chromosome or position...',
    allTypes: 'All Types',
    variants: 'Variants',
    noMutations: 'No mutations found matching your criteria',
    mutationDetails: 'Mutation Details',
    position: 'Position',
    change: 'Change',
    filter: 'Filter',
    selectMutation: 'Select a mutation to view details',
    analysisTools: 'Analysis Tools',
    pathogenicity: 'Pathogenicity Prediction',
    populationFreq: 'Population Frequency',
    functionalAnnotation: 'Functional Annotation'
  },

  // Charts & Visualization
  charts: {
    title: 'Charts & Analytics',
    subtitle: 'Visualize and analyze your genomic data',
    refreshData: 'Refresh Data',
    sequenceLengthDist: 'Sequence Length Distribution',
    sequenceTypeDist: 'Sequence Type Distribution',
    qualityDist: 'Quality Score Distribution',
    analysisProgress: 'Analysis Progress',
    exportChart: 'Export Chart',
    chartSettings: 'Chart Settings',
    noData: 'No data available for visualization',
    runAnalyses: 'Run some analyses to see progress charts'
  },

  // Performance
  performance: {
    title: 'Performance Monitor',
    subtitle: 'Real-time system performance and resource usage',
    cpuUsage: 'CPU Usage',
    memory: 'Memory',
    diskUsage: 'Disk Usage',
    network: 'Network',
    resourceUsage: 'Resource Usage',
    processMonitor: 'Process Monitor',
    totalProcesses: 'Total Processes',
    activeTasks: 'Active Tasks',
    systemInfo: 'System Information',
    platform: 'Platform',
    version: 'Version',
    uptime: 'Uptime',
    autoRefresh: 'Auto-refresh',
    refreshNow: 'Refresh Now',
    updating: 'Updating every 2 seconds',
    mainProcess: 'GENOME Main Process',
    sequenceAlignment: 'Sequence Alignment',
    fileParser: 'File Parser',
    dataVisualization: 'Data Visualization'
  },

  // Genome Browser
  genomeBrowser: {
    title: 'Genome Browser',
    subtitle: 'Interactive genomic data visualization',
    region: 'Region',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    bookmark: 'Bookmark',
    tracks: 'Tracks',
    geneAnnotations: 'Gene Annotations',
    variants: 'Variants',
    readCoverage: 'Read Coverage',
    repeatElements: 'Repeat Elements',
    conservation: 'Conservation',
    quickNavigation: 'Quick Navigation',
    selectTracks: 'Select tracks to display genomic data'
  },

  // Import/Export
  importExport: {
    title: 'Data Import Center',
    subtitle: 'Import and manage your genomic data files',
    browseFiles: 'Browse Files',
    browseFilesDesc: 'Select from computer',
    fromDatabase: 'From Database',
    fromDatabaseDesc: 'Import from NCBI',
    exportTitle: 'Data Export',
    exportSubtitle: 'Export your analysis results and data',
    exportTools: 'Export tools will be available here'
  },

  // Extensions
  extensions: {
    title: 'Extensions',
    search: 'Search extensions...',
    allExtensions: 'All Extensions',
    installed: 'Installed',
    available: 'Available',
    install: 'Install',
    configure: 'Configure',
    verified: 'Verified',
    blastSearch: 'BLAST Search',
    blastSearchDesc: 'Perform BLAST searches against NCBI databases',
    phyloTrees: 'Phylogenetic Trees',
    phyloTreesDesc: 'Advanced phylogenetic tree construction and visualization',
    proteinFolding: 'Protein Folding',
    proteinFoldingDesc: 'Predict protein structures using AI models'
  },

  // Settings
  settings: {
    title: 'Settings',
    subtitle: 'Configure your GENOME application preferences',
    reset: 'Reset to Defaults',
    appearance: 'Appearance',
    appearanceDesc: 'Customize the look and feel of the application',
    theme: 'Theme',
    fontSize: 'Font Size',
    fontSizeDesc: 'Adjust text size throughout the application',
    highContrast: 'High Contrast',
    highContrastDesc: 'Increase contrast for better visibility',
    reduceMotion: 'Reduce Motion',
    reduceMotionDesc: 'Minimize animations and transitions',
    enableAnimations: 'Enable Animations',
    enableAnimationsDesc: 'Show smooth transitions and effects',
    accessibility: 'Accessibility',
    accessibilityDesc: 'Make the application more accessible',
    language: 'Language',
    general: 'General',
    generalDesc: 'Configure general application behavior',
    autoSave: 'Auto Save',
    autoSaveDesc: 'Automatically save your work',
    showQualityScores: 'Show Quality Scores',
    showQualityScoresDesc: 'Display quality scores by default',
    notifications: 'Notifications',
    notificationsDesc: 'Show desktop notifications',
    performance: 'Performance',
    performanceDesc: 'Optimize application performance',
    maxMemoryUsage: 'Maximum Memory Usage',
    maxMemoryUsageDesc: 'Limit memory usage for large datasets',
    cacheSize: 'Cache Size',
    cacheSizeDesc: 'Amount of disk space for caching',
    privacy: 'Privacy & Security',
    privacyDesc: 'Control data sharing and security',
    autoUpdate: 'Automatic Updates',
    autoUpdateDesc: 'Download and install updates automatically',
    telemetry: 'Usage Analytics',
    telemetryDesc: 'Help improve GENOME by sharing anonymous usage data',
    advanced: 'Advanced',
    advancedDesc: 'Advanced configuration options',
    fileHandling: 'File Handling',
    defaultFileFormat: 'Default File Format',
    compressionLevel: 'Compression Level',
    compressionNone: 'None',
    compressionFast: 'Fast',
    compressionBalanced: 'Balanced',
    compressionMaximum: 'Maximum',
    defaultAlignment: 'Default Alignment Algorithm',
    threadCount: 'Thread Count',
    threadAuto: 'Auto'
  },

  // Themes
  theme: {
    light: 'Light',
    lightDesc: 'Clean and bright interface',
    dark: 'Dark',
    darkDesc: 'Easy on the eyes',
    auto: 'Auto',
    autoDesc: 'Follow system preference',
    blue: 'Ocean Blue',
    blueDesc: 'Professional blue theme',
    green: 'Forest Green',
    greenDesc: 'Nature-inspired green',
    purple: 'Royal Purple',
    purpleDesc: 'Elegant purple theme'
  },

  // Projects
  projects: {
    create: 'Create Project',
    open: 'Open Project',
    save: 'Save Project',
    export: 'Export Project',
    import: 'Import Project',
    close: 'Close Project',
    name: 'Project Name',
    description: 'Description',
    type: 'Project Type',
    created: 'Created',
    modified: 'Last Modified',
    noProjects: 'No projects available'
  },

  // Tasks & Jobs
  tasks: {
    title: 'Tasks',
    running: 'Running',
    completed: 'Completed',
    failed: 'Failed',
    pending: 'Pending',
    noTasks: 'No active tasks',
    progress: 'Progress',
    startTime: 'Start Time',
    duration: 'Duration',
    cancel: 'Cancel Task',
    retry: 'Retry Task',
    viewResults: 'View Results'
  },

  // Console & Logs
  console: {
    title: 'Console',
    clear: 'Clear Console',
    export: 'Export Logs',
    filter: 'Filter',
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    success: 'Success',
    timestamp: 'Timestamp',
    message: 'Message',
    noLogs: 'No console output'
  },

  // Common UI Elements
  common: {
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    install: 'Install',
    configure: 'Configure',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    open: 'Open',
    delete: 'Delete',
    edit: 'Edit',
    copy: 'Copy',
    paste: 'Paste',
    cut: 'Cut',
    undo: 'Undo',
    redo: 'Redo',
    refresh: 'Refresh',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    apply: 'Apply',
    reset: 'Reset',
    clear: 'Clear',
    select: 'Select',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    skip: 'Skip',
    back: 'Back',
    forward: 'Forward',
    up: 'Up',
    down: 'Down',
    left: 'Left',
    right: 'Right',
    add: 'Add',
    remove: 'Remove',
    create: 'Create',
    update: 'Update',
    upload: 'Upload',
    download: 'Download',
    import: 'Import',
    export: 'Export',
    view: 'View',
    hide: 'Hide',
    show: 'Show',
    expand: 'Expand',
    collapse: 'Collapse',
    maximize: 'Maximize',
    minimize: 'Minimize',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen'
  },

  // Error Messages
  errors: {
    fileNotFound: 'File not found',
    invalidFormat: 'Invalid file format',
    uploadFailed: 'Upload failed',
    networkError: 'Network error',
    permissionDenied: 'Permission denied',
    outOfMemory: 'Out of memory',
    processingFailed: 'Processing failed',
    unknownError: 'Unknown error occurred',
    tryAgain: 'Please try again',
    contactSupport: 'Contact support if the problem persists'
  },

  // Success Messages
  success: {
    fileSaved: 'File saved successfully',
    fileUploaded: 'File uploaded successfully',
    analysisCompleted: 'Analysis completed successfully',
    settingsSaved: 'Settings saved successfully',
    projectCreated: 'Project created successfully',
    dataExported: 'Data exported successfully',
    taskCompleted: 'Task completed successfully'
  }
};