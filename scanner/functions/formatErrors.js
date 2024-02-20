function formatErrors (errors) {
  if (errors.length > 0) {
    console.error(indentLine(2, 'Errors:'.bold.red))

    errors.forEach(function (error, i) {
      console.error(indentLines(4, error))
      if (i !== errors.length - 1) { singlespace() }
    })

    doublespace()
  }
}