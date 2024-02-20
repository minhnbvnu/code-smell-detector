function wrapKeys(metacall) {
  if (metacall.key) {
    return [metacall.key]
  } else if (metacall.multi) {
    return metacall.command.split(' ').slice(1)
  }

  return []
}