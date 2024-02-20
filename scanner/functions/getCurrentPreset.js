function getCurrentPreset(state) {
  const index = getCurrentPresetIndex(state);

  if (index == null) {
    return null;
  }

  const preset = state.milkdrop.presets[index];

  if (preset == null || preset.type === "UNRESOLVED") {
    return null;
  }

  return preset.preset;
}