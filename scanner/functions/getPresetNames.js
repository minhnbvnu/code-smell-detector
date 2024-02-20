function getPresetNames(state) {
  return state.milkdrop.presets.map(preset => preset.name);
}