<p align="center"></p>
<p align="center">
	<a href="https://tauri.app/"><img alt="Static Badge" src="https://img.shields.io/badge/engine-Tauri-blue?style=flat&link=https%3A%2F%2Fgodotengine.org%2F"></a>
	<a href="https://github.com/AlexTrish/GENOME/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/AlexTrish/GENOME?color=yellowgreen&link=https%3A%2F%2Fgithub.com%2FAlexTrish%2FChemG%2Freleases%2Ftag%2Fv0.0.3-alpha"></a>
	<a href="https://github.com/AlexTrish/GENOME?tab=AGPL-3.0-1-ov-file#AGPL-3.0-1-ov-file"><img alt="GitHub License" src="https://img.shields.io/github/license/AlexTrish/GENOME"></a>
</p>

## Технические особенности

- **Архитектура:**
  - Фронтенд: React.
  - Бэкенд: Node.js.

## Установка и запуск

### Системные требования

- Windows 10+ / macOS 10.15+ / Linux (Ubuntu 20.04+ или аналогичные)
- Поддержка Tauri и Rust (для сборки из исходников)

### Установка через готовый установщик

1. Скачайте установщик для вашей ОС с [релизов на GitHub](https://github.com/AlexTrish/GENOME/releases).
2. Запустите установщик и следуйте инструкциям.
3. После установки запустите программу через меню Пуск (Windows), Launchpad (macOS) или соответствующий ярлык (Linux).

### Запуск из исходников (для разработчиков)

```bash
# Клонируйте репозиторий
git clone https://github.com/AlexTrish/GENOME.git
cd GENOME

# Установите зависимости
npm install

# Запуск программы в dev режиме
npm run tauri:dev

# Сборка программы
npm run tauri:build
```

## Что доступно в ChemG?
На данный момент программа поддерживает: частичное взаимодействие с ИИ-наставником,
просмотр конспектов по неорганической химии для 8-х классов, тестирования по
пройденной теме.


## Лицензия

Эта программа распространяется под лицензией GPL-3.0 license. Более подробная информация приведена в файле `LICENSE`.
