function Function (retType, argTypes, abi) {
  if (!(this instanceof Function)) {
    return new Function(retType, argTypes, abi);
  }

  debug('creating new FunctionType');

  // check args
  assert(!!retType, 'expected a return "type" object as the first argument');
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument');

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  this.retType = ref.coerceType(retType);
  this.argTypes = argTypes.map(ref.coerceType);
  this.abi = null == abi ? bindings.FFI_DEFAULT_ABI : abi;
}