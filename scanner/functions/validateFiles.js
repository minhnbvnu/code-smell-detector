function validateFiles(dir, filePaths, t, assert) {
  const validator = new XVIZValidator();

  filePaths = filePaths.map(filePath => path.join(dir, filePath));

  return Promise.all(filePaths.map(loadJSON)).then(jsons => {
    let index = 0;
    for (const data of jsons) {
      const examplePath = filePaths[index];
      const relPath = path.relative(dir, examplePath);
      const directoryPath = path.dirname(relPath);

      // Find the proper schema, using either the directory name of
      // the file name.
      let schemaPath = directoryPath;
      const directPath = relPath.replace('.json', '.schema.json');

      if (!validator.hasSchema(schemaPath)) {
        schemaPath = directPath;
      }

      t.ok(
        validator.hasSchema(schemaPath),
        `${relPath} schema either: ${schemaPath} or ${directPath}`
      );

      // Validate the data
      assert(
        () => validator.validate(schemaPath, data),
        `${relPath} valid with schema: ${schemaPath}`
      );
      index++;
    }
  });
}