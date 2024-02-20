function asset_generator_from_bytes(asset, asset_blinder) {
  const asset_commitment_ptr = Module._malloc(ASSET_GENERATOR_LEN)
  checkCode(Module.ccall('wally_asset_generator_from_bytes'
    , 'number'
    , [ 'array', 'number', 'array', 'number', 'number', 'number' ]
    , [ asset, asset.length
      , asset_blinder, asset_blinder.length
      , asset_commitment_ptr, ASSET_GENERATOR_LEN
      ]))

  const asset_commitment = readBytes(asset_commitment_ptr, ASSET_GENERATOR_LEN)
  Module._free(asset_commitment_ptr)
  return asset_commitment
}