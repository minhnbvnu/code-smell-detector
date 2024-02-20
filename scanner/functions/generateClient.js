function generateClient ({ kindsToGroups, output }) {
  const view = {
    kinds: Object.keys(kindsToGroups).map(kind => {
      return Object.assign({ kind }, kindsToGroups[kind])
    }),
    kindTarget: function () {
      if (output) return kindFilePath(this.kind)
      return `#${this.kind}`
    }
  }

  const source = mustache.render(
    fs.readFileSync(path.join(__dirname, 'templates/markdown-client.mustache')).toString(),
    view
  )

  if (output) {
    const filePath = path.join(output, 'README.md')
    fs.writeFileSync(filePath, source)
  } else {
    console.log(source)
  }
}