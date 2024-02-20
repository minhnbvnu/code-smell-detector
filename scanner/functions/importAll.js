function importAll(map, r) {
  r.keys().forEach((filePath) => {
    map[filePath] = r(filePath);
  });
}