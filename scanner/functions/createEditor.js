function createEditor(component) {
  commandWrapper(component);
  toolbarWrapper(component);

  component.name = 'v-md-editor';
  component.theme = function (themeConfig) {
    component.themeConfig = themeConfig;
    Preview.theme(themeConfig);
  };
  component.extendMarkdown = Preview.extendMarkdown;
  component.hotkeys = [];
  component.hotkey = function (config) {
    component.hotkeys.push(config);
  };
  component.mixins = [
    commonMixin,
    vModelMixin,
    toolbarMixin(component),
    commandMixin(component),
    hotkeysMixin(component),
    fullscreenMixin,
    uploadImageMixin,
    syncScrollMixin,
    tocMixin,
    scrollMixin,
    listMixin,
    langMixin,
  ];
}