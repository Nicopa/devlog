# DevLog

A desktop application for logging development activities, built with Electron, Angular, and Angular Material.
Logging your progress in task or project tickets is essential, but sometimes you need to centralize your daily work progress in one place. That's why DevLog is a simple logger that saves TXT files and can be used both in a local application (Windows) or on the browser.

## Features

- Add development logs with timestamps;
- Categorize logs as 'important' or 'log';
- Edit and delete existing logs;
- Filter logs by category;
- Search logs by description;
- Save logs to text files;
- Load logs from text files;
- Dark/Light theme toggle;
- Responsive design;

## Prerequisites

- Node.js (v22 or later)
- yarn 1.22.22 or later

## Installation

```bash
yarn install
```

## Development

To run just the Angular application:

```bash
yarn serve
```

To build the Angular application and run the Electron application:

```bash
yarn electron
```

## Create Distributable

```bash
yarn make
```

## Usage

1. Enter a log description and select a category (important/log)
2. Click "Add Log" to create a new log entry
3. Use the category filter and search bar to find specific logs
4. Edit or delete logs using the buttons on each log card
5. Save logs to a file using the "Save Logs" button
6. Load logs from a file using the "Load Logs" button
7. Toggle between dark and light themes using the switch in the toolbar

## File Format

Logs are saved in a text file with the following format:
```
timestamp - category - description
```

Each log entry is on a new line.