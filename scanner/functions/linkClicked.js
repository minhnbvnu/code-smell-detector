function linkClicked() {
  shell.openExternal('https://github.com/yeoman/yeoman-app');
  return {
    type: COMPATIBILITY_LINK_CLICKED
  };
}