function templateContent () {
  const html = fs.readFileSync(
    path.resolve(process.cwd(), 'app/index.html')
  ).toString()

  if (!dllPlugin) { return html }

  const doc = cheerio(html)
  const body = doc.find('body')
  const dllNames = !dllPlugin.dlls ? ['reactBoilerplateDeps'] : Object.keys(dllPlugin.dlls)

  dllNames.forEach((dllName) => body.append(`<script data-dll='true' src='/${dllName}.dll.js'></script>`))

  return doc.toString()
}