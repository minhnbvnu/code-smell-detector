function drawReport(results) {
  let files

  files = results.map((result) => {
    if (!result.messages.length) {
      return ''
    }

    return `\n${result.filePath}\n\n${drawTable(result.messages)}`
  })

  files = files.filter((content) => content.trim())

  return files.join('')
}