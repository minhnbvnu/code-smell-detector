async function defineSettingsFileForScenario (settingsFileFixtureName, githubScope) {
  const pathToConfig = path.resolve(__dirname, '..', 'fixtures', settingsFileFixtureName)
  const configFile = Buffer.from(await fs.readFile(pathToConfig, 'utf8'))
  const config = configFile.toString()

  githubScope
    .get(`/repos/${repository.owner.name}/${repository.name}/contents/${encodeURIComponent(settings.FILE_NAME)}`)
    .reply(OK, config)

  return config
}