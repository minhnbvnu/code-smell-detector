function fixArity(original, wrapper) {
  const toDefine = {
    name: { value: original.name },
    length: { value: original.length }
  }
  Object.defineProperties(wrapper, toDefine)

  if (!hasOwnProperty(wrapper, symbols.name)) {
    wrapper[symbols.name] = wrapper.name
  }

  return wrapper
}