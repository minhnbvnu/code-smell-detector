function drawTable(messages) {
  const rows = []

  if (messages.length === 0) {
    return ''
  }

  rows.push([
    chalk.bold('Line'),
    chalk.bold('Column'),
    chalk.bold('Type'),
    chalk.bold('Message'),
    chalk.bold('Rule ID'),
  ])

  messages.forEach((message) => {
    let messageType

    if (message.fatal || message.severity === 2) {
      messageType = chalk.red('error')
    } else {
      messageType = chalk.yellow('warning')
    }

    rows.push([
      message.line || 0,
      message.column || 0,
      messageType,
      message.message,
      message.ruleId || '',
    ])
  })

  return table(rows, {
    columns: {
      0: {
        width: 8,
        wrapWord: true,
      },
      1: {
        width: 8,
        wrapWord: true,
      },
      2: {
        width: 8,
        wrapWord: true,
      },
      3: {
        paddingRight: 5,
        width: 50,
        wrapWord: true,
      },
      4: {
        width: 20,
        wrapWord: true,
      },
    },
    drawHorizontalLine(index) {
      return index === 1
    },
  })
}