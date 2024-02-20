function makeFiles(num) {
    const files = [];
    for (let i = 0; i < num; i++) {
      // Although these n.har files have .har extension, they are actually HARPs.
      files.push((i + 1) + ".har");
    }
    return files;
  }