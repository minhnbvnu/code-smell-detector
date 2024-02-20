function findMatchingPosition(line, file, near) {
    var pos = Math.max(0, near - 500),
        closest = null;
    if (!/^\s*$/.test(line)) for (;;) {
      var found = file.indexOf(line, pos);
      if (found < 0 || found > near + 500) break;
      if (closest == null || Math.abs(closest - near) > Math.abs(found - near)) closest = found;
      pos = found + line.length;
    }
    return closest;
  }