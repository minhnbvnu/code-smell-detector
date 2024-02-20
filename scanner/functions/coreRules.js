function coreRules(meta) {
  const { reporter, config, inputSrc, tokens } = meta

  return [
    ...bestPractises(reporter, config, inputSrc, tokens),
    ...deprecations(reporter),
    ...miscellaneous(reporter, config, tokens),
    ...naming(reporter, config),
    ...order(reporter, tokens),
    ...security(reporter, config, inputSrc),
    ...gasConsumption(reporter, config),
  ]
}