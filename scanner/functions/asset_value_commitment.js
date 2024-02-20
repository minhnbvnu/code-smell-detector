function asset_value_commitment(value, value_blinder, asset_commitment) {
  // Emscripten transforms int64 function arguments into two int32 arguments, see:
  // https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-pass-int64-t-and-uint64-t-values-from-js-into-wasm-functions
  const [value_lo, value_hi] = split_int52_lo_hi(value)

  const value_commitment_ptr = Module._malloc(ASSET_COMMITMENT_LEN)
  checkCode(Module.ccall('wally_asset_value_commitment'
    , 'number'
    , [ 'number', 'number', 'array', 'number', 'array', 'number', 'number', 'number' ]
    , [ value_lo, value_hi
      , value_blinder, value_blinder.length
      , asset_commitment, asset_commitment.length
      , value_commitment_ptr, ASSET_COMMITMENT_LEN
      ]))

  const value_commitment = readBytes(value_commitment_ptr, ASSET_COMMITMENT_LEN)
  Module._free(value_commitment_ptr)
  return value_commitment
}