function generateCustomCSS(vars) {
    var result = ''

    for (var key in vars) {
      result += key + ': ' + vars[key] + ';\n'
    }

    return result + '\n\n'
  }