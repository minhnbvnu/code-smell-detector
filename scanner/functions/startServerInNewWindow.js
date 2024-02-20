function startServerInNewWindow() {
  const packagerPath = path.resolve(__dirname, '..', '..', 'packager', 'packager.sh');
  child_process.spawn('gnome-terminal',['-e', packagerPath],{detached: true});
}