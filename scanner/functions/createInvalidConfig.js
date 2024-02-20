function createInvalidConfig(dir, filename) {
    CONFIG_PATH = path.join(dir, filename)

    fs.writeFileSync(CONFIG_PATH, `exports.config = null.pleaseThrow`)
  }