function checkForUpdates(bShowDialog = true) {
  global.checkUpdateEnabled = false;
  global.userCheckForUpdate = bShowDialog;
  /* if (process.platform === 'win32' && os.arch() === 'ia32') {
      const s3Options = {
        provider: 's3',
        bucket: 'updates.dbkoda.32bit',
        region: 'ap-southeast-2',
      };
      autoUpdater.setFeedURL(s3Options);
    } */
  autoUpdater.checkForUpdates();
}