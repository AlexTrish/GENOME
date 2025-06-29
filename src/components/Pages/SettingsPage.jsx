import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Palette, 
  Monitor, 
  Sun, 
  Moon, 
  Laptop,
  Save,
  RotateCcw,
  Bell,
  Shield,
  Database,
  Zap,
  Eye,
  Type,
  Globe
} from 'lucide-react';
import { useGenomeStore } from '../../store';
import { useTranslation, getAvailableLanguages } from '../../locales';
import clsx from 'clsx';

const SettingSection = ({ title, description, icon: Icon, children }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const ThemeCard = ({ theme, isSelected, onSelect, t }) => {
  const themes = {
    light: {
      name: t('theme.light'),
      description: t('theme.lightDesc'),
      icon: Sun,
      preview: 'bg-gradient-to-br from-white to-gray-100',
      textColor: 'text-gray-900'
    },
    dark: {
      name: t('theme.dark'),
      description: t('theme.darkDesc'),
      icon: Moon,
      preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
      textColor: 'text-white'
    },
    auto: {
      name: t('theme.auto'),
      description: t('theme.autoDesc'),
      icon: Laptop,
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
      textColor: 'text-white'
    },
    blue: {
      name: t('theme.blue'),
      description: t('theme.blueDesc'),
      icon: Monitor,
      preview: 'bg-gradient-to-br from-blue-600 to-blue-800',
      textColor: 'text-white'
    },
    green: {
      name: t('theme.green'),
      description: t('theme.greenDesc'),
      icon: Monitor,
      preview: 'bg-gradient-to-br from-green-600 to-green-800',
      textColor: 'text-white'
    },
    purple: {
      name: t('theme.purple'),
      description: t('theme.purpleDesc'),
      icon: Monitor,
      preview: 'bg-gradient-to-br from-purple-600 to-purple-800',
      textColor: 'text-white'
    }
  };

  const themeData = themes[theme];
  const Icon = themeData.icon;

  return (
    <button
      onClick={() => onSelect(theme)}
      className={clsx(
        'p-4 border-2 rounded-lg transition-all hover:scale-105',
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      )}
    >
      <div className={`w-full h-20 ${themeData.preview} rounded-lg mb-3 flex items-center justify-center`}>
        <Icon className={`w-8 h-8 ${themeData.textColor}`} />
      </div>
      <div className="text-left">
        <h4 className={clsx(
          'font-medium',
          isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
        )}>
          {themeData.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {themeData.description}
        </p>
      </div>
    </button>
  );
};

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium text-gray-900 dark:text-white">{label}</div>
      {description && (
        <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
      )}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  </div>
);

const SelectField = ({ label, value, onChange, options, description }) => (
  <div>
    <label className="block font-medium text-gray-900 dark:text-white mb-1">
      {label}
    </label>
    {description && (
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const SettingsPage = () => {
  const { theme, setTheme, settings, updateSettings } = useGenomeStore();
  const { t } = useTranslation(settings.language);
  const availableLanguages = getAvailableLanguages();

  // Функция для мгновенного изменения настроек
  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value });
  };

  // Функция для мгновенного изменения темы
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleReset = () => {
    const defaultSettings = {
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
    updateSettings(defaultSettings);
    setTheme('dark');
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <Settings className="w-16 h-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('settings.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t('settings.reset')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance Settings */}
        <div className="space-y-6">
          <SettingSection
            title={t('settings.appearance')}
            description={t('settings.appearanceDesc')}
            icon={Palette}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t('settings.theme')}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['light', 'dark', 'auto', 'blue', 'green', 'purple'].map(themeOption => (
                    <ThemeCard
                      key={themeOption}
                      theme={themeOption}
                      isSelected={theme === themeOption}
                      onSelect={handleThemeChange}
                      t={t}
                    />
                  ))}
                </div>
              </div>

              <SelectField
                label={t('settings.fontSize')}
                value={settings.fontSize}
                onChange={(value) => handleSettingChange('fontSize', value)}
                description={t('settings.fontSizeDesc')}
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                  { value: 'extra-large', label: 'Extra Large' }
                ]}
              />

              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.highContrast}
                  onChange={(value) => handleSettingChange('highContrast', value)}
                  label={t('settings.highContrast')}
                  description={t('settings.highContrastDesc')}
                />
                <ToggleSwitch
                  enabled={settings.reducedMotion}
                  onChange={(value) => handleSettingChange('reducedMotion', value)}
                  label={t('settings.reduceMotion')}
                  description={t('settings.reduceMotionDesc')}
                />
                <ToggleSwitch
                  enabled={settings.enableAnimations}
                  onChange={(value) => handleSettingChange('enableAnimations', value)}
                  label={t('settings.enableAnimations')}
                  description={t('settings.enableAnimationsDesc')}
                />
              </div>
            </div>
          </SettingSection>

          <SettingSection
            title={t('settings.accessibility')}
            description={t('settings.accessibilityDesc')}
            icon={Eye}
          >
            <div className="space-y-4">
              <SelectField
                label={t('settings.language')}
                value={settings.language}
                onChange={(value) => handleSettingChange('language', value)}
                options={availableLanguages.map(lang => ({
                  value: lang.code,
                  label: `${lang.nativeName} (${lang.name})`
                }))}
              />
            </div>
          </SettingSection>
        </div>

        {/* Functionality Settings */}
        <div className="space-y-6">
          <SettingSection
            title={t('settings.general')}
            description={t('settings.generalDesc')}
            icon={Settings}
          >
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.autoSave}
                onChange={(value) => handleSettingChange('autoSave', value)}
                label={t('settings.autoSave')}
                description={t('settings.autoSaveDesc')}
              />
              <ToggleSwitch
                enabled={settings.showQualityScores}
                onChange={(value) => handleSettingChange('showQualityScores', value)}
                label={t('settings.showQualityScores')}
                description={t('settings.showQualityScoresDesc')}
              />
              <ToggleSwitch
                enabled={settings.notifications}
                onChange={(value) => handleSettingChange('notifications', value)}
                label={t('settings.notifications')}
                description={t('settings.notificationsDesc')}
              />
            </div>
          </SettingSection>

          <SettingSection
            title={t('settings.performance')}
            description={t('settings.performanceDesc')}
            icon={Zap}
          >
            <div className="space-y-4">
              <SelectField
                label={t('settings.maxMemoryUsage')}
                value={settings.maxMemoryUsage}
                onChange={(value) => handleSettingChange('maxMemoryUsage', value)}
                description={t('settings.maxMemoryUsageDesc')}
                options={[
                  { value: '2GB', label: '2 GB' },
                  { value: '4GB', label: '4 GB' },
                  { value: '8GB', label: '8 GB' },
                  { value: '16GB', label: '16 GB' },
                  { value: 'unlimited', label: 'Unlimited' }
                ]}
              />
              <SelectField
                label={t('settings.cacheSize')}
                value={settings.cacheSize}
                onChange={(value) => handleSettingChange('cacheSize', value)}
                description={t('settings.cacheSizeDesc')}
                options={[
                  { value: '500MB', label: '500 MB' },
                  { value: '1GB', label: '1 GB' },
                  { value: '2GB', label: '2 GB' },
                  { value: '5GB', label: '5 GB' }
                ]}
              />
            </div>
          </SettingSection>

          <SettingSection
            title={t('settings.privacy')}
            description={t('settings.privacyDesc')}
            icon={Shield}
          >
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.autoUpdate}
                onChange={(value) => handleSettingChange('autoUpdate', value)}
                label={t('settings.autoUpdate')}
                description={t('settings.autoUpdateDesc')}
              />
              <ToggleSwitch
                enabled={settings.telemetry}
                onChange={(value) => handleSettingChange('telemetry', value)}
                label={t('settings.telemetry')}
                description={t('settings.telemetryDesc')}
              />
            </div>
          </SettingSection>
        </div>
      </div>

      {/* Advanced Settings */}
      <SettingSection
        title={t('settings.advanced')}
        description={t('settings.advancedDesc')}
        icon={Database}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">{t('settings.fileHandling')}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('settings.defaultFileFormat')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>FASTA</option>
                  <option>FASTQ</option>
                  <option>GenBank</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('settings.compressionLevel')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>{t('settings.compressionNone')}</option>
                  <option>{t('settings.compressionFast')}</option>
                  <option>{t('settings.compressionBalanced')}</option>
                  <option>{t('settings.compressionMaximum')}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">{t('analysis.title')}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('settings.defaultAlignment')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Needleman-Wunsch</option>
                  <option>Smith-Waterman</option>
                  <option>BLAST</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('settings.threadCount')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>{t('settings.threadAuto')}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>4</option>
                  <option>8</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </SettingSection>
    </div>
  );
};