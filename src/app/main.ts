// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

import { app, ipcMain } from 'electron';
import { createMainWindow, loadURL } from '../main-window';
// import * as log from "electron-log"
import * as isDev from 'electron-is-dev';
// import { createUpdater } from "../lib/updater"
import { createMenu } from '../menu';
// import * as path from 'path';
// import { format } from 'url';
import { createServer } from '../server/app';
import { printOut } from '../lib/print';
import { createAutoLauncher } from '../lib/auto-launch';
// set proper logging level
// log.transports.file.level = isDev ? false : "info"
// log.transports.console.level = isDev ? "debug" : false

let mainWindow: Electron.BrowserWindow;
const appPath = app.getAppPath();

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.
// const appPath = app.getAppPath();

// fires when Electron is ready to start
app.on('ready', () => {
  mainWindow = createMainWindow(appPath, true);

  loadURL(mainWindow, appPath);
  createMenu(mainWindow);
  createServer(app);

  const documentsPath = app.getPath('documents');
  ipcMain.on('print-out', (event: Event, props: string) => printOut(documentsPath));

  if (!isDev) {
    createAutoLauncher('Evia', documentsPath + '\\EVIA electron app with react Setup 0.1.0.exe');
  }
});

// fires when all windows are closed
app.on('window-all-closed', app.quit);

// setup the auto-updater
// createUpdater(app)
