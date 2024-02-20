function ForeignFunction (funcPtr, returnType, argTypes, abi) {
  debug('creating new ForeignFunction', funcPtr);

  // check args
  assert(Buffer.isBuffer(funcPtr), 'expected Buffer as first argument');
  assert(!!returnType, 'expected a return "type" object as the second argument');
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the third argument');

  // normalize the "types" (they could be strings,
  // so turn into real type instances)
  returnType = ref.coerceType(returnType);
  argTypes = argTypes.map(ref.coerceType);

  // create the `ffi_cif *` instance
  const cif = CIF(returnType, argTypes, abi);

  // create and return the JS proxy function
  return _ForeignFunction(cif, funcPtr, returnType, argTypes);
}