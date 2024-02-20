function generateVersionsTooltip(versions) {
    return versions.map(function(lib) {
      return lib.name + " " + lib.version;
    }).join("\n");
  }