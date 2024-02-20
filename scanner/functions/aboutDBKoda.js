function aboutDBKoda() {
  let strAbout = 'Version ';
  strAbout += global.APP_VERSION;
  strAbout += '\n\n';
  strAbout += 'Copyright © 2018 Southbank Software';
  dialog.showMessageBox(
    {
      title: 'About dbKoda',
      message: strAbout
    },
    () => {}
  );
}