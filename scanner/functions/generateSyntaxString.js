function generateSyntaxString(name, args, isFPFn) {
  if (isFPFn) {
    return args.reduce((acc, arg) => acc.concat(`(${arg.name})`), name)
  } else {
    const argsString = args.map((arg) => (arg.optional ? `[${arg.name}]` : arg.name)).join(', ')
    return `${name}(${argsString})`
  }
}