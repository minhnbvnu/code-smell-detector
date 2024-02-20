function hasParsedCode(funct) {
    return funct["(global)"] && !funct["(verb)"];
  }