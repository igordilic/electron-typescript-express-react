import AutoLaunch = require('auto-launch');

export function createAutoLauncher(name: string, path: string) {
  const appLauncher = new AutoLaunch({
    name,
    path,
  });

  appLauncher
    .isEnabled()
    .then(isEnabled => {
      if (isEnabled) {
        return;
      }
      appLauncher.enable();
    })
    .catch(err => console.log(err));
}
