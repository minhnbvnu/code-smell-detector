function _getName(nameState, path) {
  const verb = nameState.verb ? '/' + nameState.verb : ''
  return (nameState.prefix || '') + verb + (nameState.delimiter || '') + path
}