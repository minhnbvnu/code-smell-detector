function getFormatter(formatter) {
  const formatterName = formatter || 'stylish'
  try {
    return require(`./lib/formatters/${formatterName}`)
  } catch (ex) {
    ex.message = `\nThere was a problem loading formatter option: ${
      program.opts().formatter
    } \nError: ${ex.message}`
    throw ex
  }
}