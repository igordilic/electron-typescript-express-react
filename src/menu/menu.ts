import { Menu } from 'electron';
import { createWindowsMenu } from './windows-menu';
import { isWindows } from '../lib/platform';

/**
 * Attaches the menu to the appropriate place.
 *
 * @param window The main window.
 */
export function createMenu(window: Electron.BrowserWindow) {
   if (isWindows()) {
    // on windows, the menu goes on the window
    const template = createWindowsMenu(window);
    const menu = Menu.buildFromTemplate(template);
    window.setMenu(menu);
  }
}
