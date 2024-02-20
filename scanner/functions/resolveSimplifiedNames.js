function resolveSimplifiedNames (config) {
  let { name } = config

  if (!name.startsWith('.') && !name.startsWith('@') && !name.startsWith('nextein-plugin-')) {
    name = `nextein-plugin-${name}`
  }

  return {
    ...config,
    name
  }
}