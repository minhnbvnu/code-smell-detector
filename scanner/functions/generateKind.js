function generateKind ({ kind, output }) {
  const view = {
    kindKey: kind.kindKey,
    groups: Object.keys(kind.groups).map(group => ({
      groupKey: group,
      operations: kind.groups[group]
    })),
    /**
     * Replace newline characters in rendered text with <br/>s.
     * @returns {function} function
     */
    markdownBreaks: function () {
      return function (text, render) {
        return render(text)
          .replace(/\r\n/g, '<br/>')
          .replace(/\n/g, '<br/>')
      }
    },
    /**
     * When in a method section, return the full kubernetes-client name.
     * @returns {function} function
     */
    jsName: function () {
      return function () {
        const leadingAndTrailingSlashes = /(^\/)|(\/$)/g
        const jsName = this.path
          .replace(leadingAndTrailingSlashes, '')
          .replace(/\/{/g, '(') // replace /{ with (
          .replace(/}\//g, ').') // replace }/ with ).
          .replace(/}/g, ')') // replace } with )
          .replace(/\//g, '.') // replace / with .
        return `${jsName}.${this.method.toLowerCase()}`
      }
    }
  }
  const partials = {
    group: fs.readFileSync(path.join(__dirname, 'templates/markdown-group.mustache')).toString(),
    operation: fs.readFileSync(path.join(__dirname, 'templates/markdown-operation.mustache')).toString()
  }

  const source = mustache.render(
    fs.readFileSync(path.join(__dirname, 'templates/markdown-kind.mustache')).toString(),
    view,
    partials
  )

  if (output) {
    const filePath = path.join(output, kindFilePath(kind.kindKey))
    fs.writeFileSync(filePath, source)
  } else {
    console.log(source)
  }
}