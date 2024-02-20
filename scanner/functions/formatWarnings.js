function formatWarnings (warnings) {
  if (warnings.length > 0) {
    console.log(indentLine(2, 'Warnings:'.bold.yellow))

    warnings.forEach(function (warning, i) {
      console.log(indentLines(4, warning))
      if (i !== warnings.length - 1) { singlespace() }
    })

    doublespace()
  }
}