function createPlugin (options) {
  const resolved = resolvePlugin(options.name)
  const renderer = hasRenderer(resolved)
  return {
    ...options,
    resolved,
    renderer
  }
}