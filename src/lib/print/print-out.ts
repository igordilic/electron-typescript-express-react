// import * as printer from 'electron-print';
import { BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';


function setUrl(path: string, file: string): string {
  return format({
    protocol: 'file:',
    pathname: join(path, file),
    slashes: true,
  });
}

export function printOut(path: string) {
  const pathToTempFile = setUrl(path, 'print.html');
  let win = new BrowserWindow({ show: false });
  win.loadURL(pathToTempFile);
  // win.show();
  win.webContents.on('did-finish-load', () => {
    console.log('Printing...');
    win.webContents.print({ silent: false, printBackground: false });
  });
}
