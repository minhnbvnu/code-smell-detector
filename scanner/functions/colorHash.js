function colorHash(name) {
      // Return an rgb() color string that is a hash of the provided name,
      // and with a warm palette.
      var vector = 0;
      if (name) {
        name = name.replace(/.*`/, "");		// drop module name if present
        name = name.replace(/\(.*/, "");	// drop extra info
        vector = generateHash(name);
      }
      var r = 200 + Math.round(55 * vector);
      var g = 0 + Math.round(230 * (1 - vector));
      var b = 0 + Math.round(55 * (1 - vector));
      return "rgb(" + r + "," + g + "," + b + ")";
    }