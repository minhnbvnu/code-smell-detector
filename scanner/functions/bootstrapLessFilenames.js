function bootstrapLessFilenames() {
    var IMPORT_REGEX = /^@import \"(.*?)\";$/
    var bootstrapLessLines = __less['bootstrap.less'].split('\n')

    for (var i = 0, imports = []; i < bootstrapLessLines.length; i++) {
      var match = IMPORT_REGEX.exec(bootstrapLessLines[i])
      if (match) imports.push(match[1])
    }

    return imports
  }