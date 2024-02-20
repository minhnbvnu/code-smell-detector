function generate_commitments(value, asset_hex, value_blinder_hex, asset_blinder_hex) {
  const asset = parseHex(asset_hex, ASSET_TAG_LEN)
      , value_blinder = parseHex(value_blinder_hex, BLINDING_FACTOR_LEN)
      , asset_blinder = parseHex(asset_blinder_hex, BLINDING_FACTOR_LEN)

  const asset_commitment = asset_generator_from_bytes(asset, asset_blinder)
      , value_commitment = asset_value_commitment(value, value_blinder, asset_commitment)

  return { asset_commitment: encodeHex(asset_commitment)
         , value_commitment: encodeHex(value_commitment) }
}