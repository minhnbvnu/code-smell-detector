function milkdrop_appendPresetFileList(fileList) {
  return async (dispatch, getState, {
    convertPreset
  }) => {
    const presets = Array.from(fileList).map(file => {
      const JSON_EXT = ".json";
      const MILK_EXT = ".milk";
      const filename = file.name.toLowerCase();

      if (filename.endsWith(MILK_EXT)) {
        if (convertPreset == null) {
          throw new Error("Invalid type");
        }

        return {
          type: "UNRESOLVED",
          name: file.name.slice(0, file.name.length - MILK_EXT.length),
          getPreset: () => convertPreset(file)
        };
      } else if (filename.endsWith(JSON_EXT)) {
        return {
          type: "UNRESOLVED",
          name: file.name.slice(0, file.name.length - JSON_EXT.length),
          getPreset: async () => {
            const str = await genStringFromFileReference(file); // TODO: How should we handle the case where json parsing fails?

            return JSON.parse(str);
          }
        };
      }

      console.error("Invalid type preset when loading directory");
      return null;
    }).filter(Boolean);
    dispatch(loadPresets(presets));
  };
}