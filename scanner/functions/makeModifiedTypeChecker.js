function makeModifiedTypeChecker(origChecker) {
    // Check if a video type is allowed
    return function (type) {
      if (type === undefined) return '';
      var disallowed_types = ['webm', 'vp8', 'vp9', 'av01'];
      // If video type is in disallowed_types, say we don't support them
      for (var i = 0; i < disallowed_types.length; i++) {
        if (type.indexOf(disallowed_types[i]) !== -1) return '';
      }

      if (localStorage['h264ify-block_60fps'] === 'true') {
        var match = /framerate=(\d+)/.exec(type);
        if (match && match[1] > 30) return '';
      }

      // Otherwise, ask the browser
      return origChecker(type);
    };
  }