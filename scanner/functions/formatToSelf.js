function formatToSelf(file, argv) {
  var source = getSource(file);
  var config = getConfig(file, argv);
  if (!source || !config) return;
  try {
    fs.writeFileSync(file, esformatter.format(source, config));
  } catch (e) {
    logError({
      stack: e.stack,
      message: e.message,
      file: file
    });
  }
}