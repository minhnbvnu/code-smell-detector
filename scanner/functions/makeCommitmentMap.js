function makeCommitmentMap(blinders) {
  const commitments = new Map

  blinders.forEach(b => {
    const { asset_commitment, value_commitment } =
      libwally.generate_commitments(b.value, b.asset, b.value_blinder, b.asset_blinder)

    commitments.set(`${asset_commitment}:${value_commitment}`, {
      asset: b.asset,
      value: b.value,
    })
  })

  return commitments
}