function ClipboardImporter(config) {
  if (!config.schema) {
    throw new Error('Missing argument: config.schema is required.');
  }
  _.extend(config, {
    trimWhitespaces: true,
    REMOVE_INNER_WS: true,
  });
  ClipboardImporter.super.call(this, config);
}