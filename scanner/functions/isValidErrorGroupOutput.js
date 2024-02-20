function isValidErrorGroupOutput(output) {
  return (typeof output === 'string' || output instanceof String) && output !== ''
}