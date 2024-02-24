function CIF_var (rtype, types, numFixedArgs, abi) {
  debug('creating `ffi_cif *` instance with `ffi_prep_cif_var()`');

  // the return and arg types are expected to be coerced at this point...
  assert(!!rtype, 'expected a return "type" object as the first argument');
  assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument');
  assert(numFixedArgs >= 1, 'expected the number of fixed arguments to be at least 1');

  // the buffer that will contain the return `ffi_cif *` instance
  const cif = Buffer.alloc(FFI_CIF_SIZE);

  const numTotalArgs = types.length;
  const _argtypesptr = Buffer.alloc(numTotalArgs * POINTER_SIZE);
  const _rtypeptr = Type(rtype);

  for (let i = 0; i < numTotalArgs; i++) {
    const ffiType = Type(types[i]);
    _argtypesptr.writePointer(ffiType, i * POINTER_SIZE);
  }

  // prevent GC of the arg type and rtn type buffers (not sure if this is required)
  cif.rtnTypePtr = _rtypeptr;
  cif.argTypesPtr = _argtypesptr;

  if (typeof abi === 'undefined') {
    debug('no ABI specified (this is OK), using FFI_DEFAULT_ABI');
    abi = FFI_DEFAULT_ABI;
  }

  const status = ffi_prep_cif_var(cif, numFixedArgs, numTotalArgs, _rtypeptr, _argtypesptr, abi);

  if (status !== FFI_OK) {
    switch (status) {
      case FFI_BAD_TYPEDEF:
      {
        const err = new Error('ffi_prep_cif_var() returned an FFI_BAD_TYPEDEF error');
        err.code = 'FFI_BAD_TYPEDEF';
        err.errno = status;
        throw err;
      }
      case FFI_BAD_ABI:
      {
        const err = new Error('ffi_prep_cif_var() returned an FFI_BAD_ABI error');
        err.code = 'FFI_BAD_ABI';
        err.errno = status;
        throw err;
      }
      default:
      {
        const err = new Error('ffi_prep_cif_var() returned an error: ' + status);
        err.errno = status;
        throw err;
      }
    }
  }

  return cif;
}