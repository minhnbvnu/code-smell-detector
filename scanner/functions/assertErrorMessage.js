function assertErrorMessage(...args) {
  const report = args[0]
  let index
  let message

  if (args.length === 3) {
    index = args[1]
    message = args[2]
  } else {
    index = 0
    message = args[1]
  }

  const errorMessage = `Report should contain message with text "${message}" at ${index} pos. ${printReport(
    report
  )}`
  assert.ok(report.messages[index].message.includes(message), errorMessage)
}