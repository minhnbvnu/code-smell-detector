function minifyFiles(filePaths) {
  filePaths.forEach((filePath) => {
    fs.writeFileSync(
      filePath,
      Terser.minify(fs.readFileSync(filePath, "utf8")).code
    );
  });
}