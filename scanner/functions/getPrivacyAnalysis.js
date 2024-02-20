function getPrivacyAnalysis(tx) {
  // None of this applies to coinbase transactions
  if (tx.vin[0].is_coinbase) return []

  // Detect usage of confidential values in any of the inputs/outputs
  const hasCT = tx.vin.some(vin => vin.prevout && vin.prevout.value == null)
             || tx.vout.some(out => out.value == null)

  // List of outputs excluding explicit fee outputs (only relevant for CT-enabled chains)
  const outs = tx.vout.filter(vout => vout.scriptpubkey_type != 'fee')

  const detected = []

  // Issues relating to obvious change output, only applies to txs with exactly 2 spendable outputs
  if (outs.length == 2 && isSpendable(outs[0]) && isSpendable(outs[1])) {
    const [ o1, o2 ] = outs

    // Obvious change due to one output having more precision than the other
    if (!hasCT && Math.abs(lostPrecision(o1.value) - lostPrecision(o2.value)) >= 3) {
      detected.push('change-detection-precision')
    }

    // Obvious change due to different script types, where only one of the types exists in the inputs
    if (o1.scriptpubkey_type != o2.scriptpubkey_type) {
      const inputsHasType1 = inputsHasType(tx.vin, o1.scriptpubkey_type)
          , inputsHasType2 = inputsHasType(tx.vin, o2.scriptpubkey_type)

      // one exists and the other does not
      if (inputsHasType1 != inputsHasType2) {
        detected.push('change-detection-script-types')
      }
    }

    // Unnecessary input heuristic (UIH)
    if (!hasCT && tx.vin.length > 1 && !hasMultiplePrevoutSameScript(tx)) {
      // transactions with multiple inputs of the same previous output's script are possibly
      // due to the preference to always spend all inputs of the same script together, which
      // improves privacy and is implemented by (at least) Bitcoin Core and Electrum.
      // we skip checking these transactions for UIH.

      // if the transaction could've avoided the smallest input and still have enough to fund
      // any of the two outputs, the transaction has what appears to be an unnecessary input.
      const minusSmallestIn = sumInputs(tx.vin) - smallestInput(tx.vin)
          , largeOut = Math.max(o1.value, o2.value)
          , smallOut = Math.min(o1.value, o2.value)

      if (minusSmallestIn >= largeOut + tx.fee) {
        // UIH2: if it still covers the larger output and fee, this implies this was
        // a non-standard transaction that added extra inputs for exotic reasons
        detected.push('exotic-detection-uih2')
      } else if (minusSmallestIn >= smallOut + tx.fee) {
        // UIH1: if it still covers the small output and fee, this implies the smaller
        // output was the change and not the payment
        detected.push('change-detection-uih1')
      }
    }
  }

  // Limited detection for address reuse, only if the change is sent back to one of the prevout scripts
  if (hasInternalReuse(tx)) {
    detected.push('internal-address-reuse')
  }

  // Exact-sized transfers (no change) are an indication the bitcoins possibly didn't change ownership.
  // this could mean the user used the "send max" feature to transfer funds to her new wallet or
  // to her exchange account, to sell-off fork coins, or to fund a lightning channel. it could also
  // mean the wallet was able to find a combination of inputs with a change small enough to waive.
  if (outs.length == 1 && isSpendable(outs[0])) {
    detected.push('self-transfer')
  }

  // Detect CoinJoin-looking transactions
  if (!hasCT && isCoinJoinLike(tx)) {
    detected.push('coinjoin-equal-outputs')
  }

  return detected
}