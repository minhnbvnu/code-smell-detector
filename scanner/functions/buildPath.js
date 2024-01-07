function buildPath(fontChar) {
      if (font.renderer.hasBuiltPath(fontChar)) {
        return;
      }

      handler.send("commonobj", [`${font.loadedName}_path_${fontChar}`, "FontPath", font.renderer.getPathJs(fontChar)]);
    }