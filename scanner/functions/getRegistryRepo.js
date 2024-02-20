function getRegistryRepo(token, skpmConfig, repo) {
  const [, name] = repo.split('/')
  return request(
    options(
      token,
      'https://api.github.com/repos/sketchplugins/plugin-directory/contents/plugins.json'
    )
  )
    .then(data => {
      const file = JSON.parse(data)
      const buf = Buffer.from(file.content, 'base64')
      return {
        plugins: JSON.parse(buf.toString('utf-8')),
        file,
      }
    })
    .then(res => ({
      existingPlugin: res.plugins.find(
        plugin => plugin.title === skpmConfig.name || name === plugin.name
      ),
      plugins: res.plugins,
      file: res.file,
    }))
}