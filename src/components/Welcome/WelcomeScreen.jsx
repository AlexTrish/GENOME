import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Clock, 
  Folder,
  FileText,
  Database,
  Microscope,
  ChevronRight,
  Star,
  Download
} from 'lucide-react';
import { useGenomeStore } from '../../store';
import { useTranslation } from '../../locales';

const ProjectTypeCard = ({ type, title, description, icon: Icon, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
      selected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`}
  >
    <div className="flex items-start gap-3">
      <Icon className={`w-6 h-6 mt-1 ${selected ? 'text-blue-600' : 'text-gray-500'}`} />
      <div>
        <h3 className={`font-semibold ${selected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const NewProjectModal = ({ isOpen, onClose, onCreateProject, t }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedType, setSelectedType] = useState('general');
  
  const projectTypes = [
    {
      type: 'general',
      title: t('welcome.generalAnalysis'),
      description: t('welcome.generalAnalysisDesc'),
      icon: Microscope
    },
    {
      type: 'sequence',
      title: t('welcome.sequenceAnalysisType'),
      description: t('welcome.sequenceAnalysisDesc'),
      icon: FileText
    },
    {
      type: 'variant',
      title: t('welcome.variantAnalysisType'),
      description: t('welcome.variantAnalysisDesc'),
      icon: Database
    },
    {
      type: 'comparative',
      title: t('welcome.comparativeGenomics'),
      description: t('welcome.comparativeGenomicsDesc'),
      icon: Folder
    }
  ];
  
  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateProject({
        name: projectName,
        description: projectDescription,
        type: selectedType
      });
      onClose();
      setProjectName('');
      setProjectDescription('');
      setSelectedType('general');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('welcome.createProject')}
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('welcome.projectName')}
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder={t('welcome.projectName')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('welcome.projectDescription')}
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder={t('welcome.projectDescription')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('welcome.projectType')}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectTypes.map(type => (
                <ProjectTypeCard
                  key={type.type}
                  {...type}
                  selected={selectedType === type.type}
                  onClick={() => setSelectedType(type.type)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('projects.create')}
          </button>
        </div>
      </div>
    </div>
  );
};

export const WelcomeScreen = () => {
  const { projects, createProject, openProject, settings } = useGenomeStore();
  const { t } = useTranslation(settings.language);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  
  const recentProjects = projects.slice(-5).reverse();
  
  const quickActions = [
    {
      title: t('welcome.importFasta'),
      description: t('welcome.importFastaDesc'),
      icon: FileText,
      action: () => console.log('Import FASTA')
    },
    {
      title: t('welcome.sequenceAlignment'),
      description: t('welcome.sequenceAlignmentDesc'),
      icon: Microscope,
      action: () => console.log('Sequence Alignment')
    },
    {
      title: t('welcome.variantAnalysis'),
      description: t('welcome.variantAnalysisDesc'),
      icon: Database,
      action: () => console.log('Variant Analysis')
    }
  ];
  
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('welcome.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('welcome.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Start */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('welcome.quickStart')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium text-blue-900 dark:text-blue-100">
                      {t('welcome.newProject')}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      {t('welcome.newProjectDesc')}
                    </div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FolderOpen className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {t('welcome.openProject')}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('welcome.openProjectDesc')}
                    </div>
                  </div>
                </button>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('welcome.quickActions')}
                </h3>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Projects & Resources */}
          <div className="space-y-6">
            {/* Recent Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('welcome.recentProjects')}
                </h2>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              
              {recentProjects.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('welcome.noRecentProjects')}
                </p>
              ) : (
                <div className="space-y-2">
                  {recentProjects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => openProject(project)}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Folder className="w-4 h-4 text-gray-500" />
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(project.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('welcome.resources')}
              </h2>
              
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  <Star className="w-4 h-4" />
                  {t('welcome.gettingStarted')}
                </a>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  <FileText className="w-4 h-4" />
                  {t('welcome.documentation')}
                </a>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  <Download className="w-4 h-4" />
                  {t('welcome.sampleData')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewProjectModal
        isOpen={showNewProjectModal}
        
        onClose={() => setShowNewProjectModal(false)}
        onCreateProject={createProject}
        t={t}
      />
    </div>
  );
};