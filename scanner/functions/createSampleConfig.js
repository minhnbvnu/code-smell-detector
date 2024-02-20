function createSampleConfig(dir, filename) {
    CONFIG_PATH = path.join(dir, filename)

    const config = {
      app_name: filename
    }

    fs.writeFileSync(CONFIG_PATH, `exports.config = ${JSON.stringify(config)}`)
  }