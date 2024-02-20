function getConfEstimate(fee_estimates, feerate) {
  const target_est = Object.entries(fee_estimates)
    .sort((a, b) => a[0]-b[0])
    .find(([ target, target_feerate ]) => target_feerate <= feerate)
  return target_est ? target_est[0] : -1
}