function TagTree(width, height) {
      var levelsLength = (0, _core_utils.log2)(Math.max(width, height)) + 1;
      this.levels = [];

      for (var i = 0; i < levelsLength; i++) {
        var level = {
          width,
          height,
          items: []
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }