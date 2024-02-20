function testEmptyLine(s) {
      return _config.skipEmptyLines === "greedy" ? s.join("").trim() === "" : s.length === 1 && s[0].length === 0;
    }