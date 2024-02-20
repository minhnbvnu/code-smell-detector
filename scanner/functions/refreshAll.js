function refreshAll() {
        options.shade ? enableShade() : disableShade();
        if (Selection.isAwake()) setOpacity(options.bgOpacity);
      }