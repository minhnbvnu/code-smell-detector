function extractLineChangeData (output) {
  const result = []
  const diff = parseDiff(output)
  diff.forEach(d => {
    const additions = []
    d.chunks.forEach(chunk => {
      if (chunk.newLines > 0) {
        additions.push({
          start: chunk.newStart - 1,
          end: chunk.newStart + chunk.newLines - 2
        })
      }
    })
    additions.sort((a, b) => a.start - b.start)
    if (d.to !== '/dev/null') {
      result.push({
        filepath: d.to,
        changes: additions
      })
    }
  })
  return result
}