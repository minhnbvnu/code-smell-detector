function __getPresetConfig({ Vue, appItem, current }) {
  const { userStatus, layout } = __getUserStatusAndLayout({ Vue });
  const presetConfig = appItem.content.presets[userStatus][layout];
  return presetConfig[current.appLanguage] || presetConfig;
}