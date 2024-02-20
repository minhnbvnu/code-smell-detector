function normalizePresetTypes(preset) {
  const {
    name
  } = preset;

  if ("butterchurnPresetObject" in preset) {
    return {
      type: "RESOLVED",
      name,
      preset: preset.butterchurnPresetObject
    };
  } else if ("getButterchrunPresetObject" in preset) {
    return {
      type: "UNRESOLVED",
      name,
      getPreset: preset.getButterchrunPresetObject
    };
  } else if ("butterchurnPresetUrl" in preset) {
    return {
      type: "UNRESOLVED",
      name,
      getPreset: async () => {
        const resp = await fetch(preset.butterchurnPresetUrl);
        return resp.json();
      }
    };
  }

  throw new Error("Invalid preset object");
}