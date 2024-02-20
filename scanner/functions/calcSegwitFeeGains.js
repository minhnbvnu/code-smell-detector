function calcSegwitFeeGains(tx) {

  if (process.env.IS_ELEMENTS) {
    // None of this is relevant for like liquid/elements where segwit is mandatory
    return { realizedGains: 0, potentialBech32Gains: 0, potentialP2shGains: 0 }
  }

  // calculated in weight units
  let realizedGains = 0
    , potentialBech32Gains = 0
    , potentialP2shGains = 0

  for (const vin of tx.vin) {
    if (!vin.prevout) continue;

    const isP2pkh = vin.prevout.scriptpubkey_type == 'p2pkh'
        , isP2sh  = vin.prevout.scriptpubkey_type == 'p2sh'
        , isP2wsh = vin.prevout.scriptpubkey_type == 'v0_p2wsh'
        , isP2wpkh = vin.prevout.scriptpubkey_type == 'v0_p2wpkh'

        , op = vin.scriptsig ? vin.scriptsig_asm.split(' ')[0] : null
        , isP2sh2Wpkh = isP2sh && !!vin.witness && op == 'OP_PUSHBYTES_22'
        , isP2sh2Wsh = isP2sh && !!vin.witness && op == 'OP_PUSHBYTES_34'

    switch (true) {
      // Native Segwit - P2WPKH/P2WSH (Bech32)
      case isP2wpkh:
      case isP2wsh:
        // maximal gains: the scriptSig is moved entirely to the witness part
        realizedGains += witnessSize(vin)*3
        // XXX P2WSH output creation is more expensive, should we take this into consideration?
        break

      // Backward compatible Segwit - P2SH-P2WPKH
      case isP2sh2Wpkh:
        // the scriptSig is moved to the witness, but we have extra 21 extra non-witness bytes (48 WU)
        realizedGains += witnessSize(vin)*3 - P2SH_P2WPKH_COST
        potentialBech32Gains += P2SH_P2WPKH_COST
        break

      // Backward compatible Segwit - P2SH-P2WSH
      case isP2sh2Wsh:
        // the scriptSig is moved to the witness, but we have extra 35 extra non-witness bytes
        realizedGains += witnessSize(vin)*3 - P2SH_P2WSH_COST
        potentialBech32Gains += P2SH_P2WSH_COST
        break

      // Non-segwit P2PKH/P2SH
      case isP2pkh:
      case isP2sh:
        const fullGains = scriptSigSize(vin)*3
        potentialBech32Gains += fullGains
        potentialP2shGains += fullGains - (isP2pkh ? P2SH_P2WPKH_COST : P2SH_P2WSH_COST)
        break

    // TODO: should we also consider P2PK and pay-to-bare-script (non-p2sh-wrapped) as upgradable to P2WPKH and P2WSH?
    }
  }

  // returned as percentage of the total tx weight
  return { realizedGains: realizedGains / (tx.weight+realizedGains) // percent of the pre-segwit tx size
         , potentialBech32Gains: potentialBech32Gains / tx.weight
         , potentialP2shGains: potentialP2shGains / tx.weight
         }
}