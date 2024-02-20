function persist() {
  const str = JSON.stringify(config, null, 2); // serialize with whitespace for human readability
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
  fs.writeFile(configPath, str, "utf8", err => {
    if (err) {
      Logger.error(`failed to persist localconfig to ${configPath}`, err);
    }
  });
}