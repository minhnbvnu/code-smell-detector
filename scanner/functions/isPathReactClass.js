function isPathReactClass(path, globalOptions) {
  const node = path.node
  const matchers = globalOptions.classNameMatchers

  if (path.matchesPattern('React.Component') || path.matchesPattern('React.PureComponent')) {
    return true
  }

  if (node && (node.name === 'Component' || node.name === 'PureComponent')) {
    return true
  }

  if (node && matchers && matchers.test(node.name)) {
    return true
  }

  return false
}