function generateSourceFiles(sourceFiles) {
  Object.keys(sourceFiles).forEach(function (file) {
    let source;
    // links are keyed to the shortened path in each doclet's `meta.filename` property
    const sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);
    helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

    try {
      source = {
        kind: 'source',
        code: helper.htmlsafe(
          fs.readFileSync(sourceFiles[file].resolved, 'utf8'),
        ),
      };
    } catch (e) {
      handle(e);
    }

    generate(
      'Source: ' + sourceFiles[file].shortened,
      [source],
      sourceOutfile,
      false,
    );
  });
}