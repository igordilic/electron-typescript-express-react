// import * as printer from 'electron-print';
import { BrowserWindow } from 'electron';
import * as fs from 'fs';
import { join } from 'path';
import { format } from 'url';

function setUrl(path: string, file: string): string {
  return format({
    protocol: 'file:',
    pathname: join(path, file),
    //slashes: true,
  });
}

export function printOut(path: string, content: string) {
  const pathToTempFile = setUrl(path, 'print.txt');
  let win = new BrowserWindow({ show: false });
  fs.writeFile(`${path}\\print.txt`, content, (err: any) => console.log(err));
  win.loadURL(pathToTempFile);
  win.webContents.on('did-finish-load', () => {
    console.log('Printing...');
    win.webContents.print({ silent: false, printBackground: false });
    // setTimeout(function() {
    //   console.log('Print is finished')
    //   // win.close();
    // }, 1000);
  });
  // printer.print(content);
}
