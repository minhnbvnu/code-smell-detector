function getFPFnType(params, returns) {
  const fpParams = params.map((param) => param.type.names)

  const arity = fpParams.length

  fpParams.push(returns)

  return `CurriedFn${arity}<${fpParams.map(getType).join(', ')}>`
}