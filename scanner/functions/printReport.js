function printReport(report) {
  const messages = report.messages.map((i, index) => `${index + 1}. ${i.message}`)
  return ['Errors / Warnings:', ...messages, ''].join('\n' + ' '.repeat(8))
}