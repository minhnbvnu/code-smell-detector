function getLogger4Command (commandName = 'unsetCommandName') {
  let loggerConfig = {
    appenders: {
      command: {
        type: 'dateFile',
        filename: `${config.absoluteLogPath}/command/${commandName}`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      },
      express: {
        type: 'dateFile',
        filename: `${config.absoluteLogPath}/express/runtime`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      }
    },
    categories: {
      default: { appenders: ['express'], level: 'info' },
      command: { appenders: ['command'], level: 'info' },
      express: { appenders: ['express'], level: 'info' }
    }
  }

  return getLogger(`command`, loggerConfig)
}