function cmdShim_ (src, to, opts) {
  return Promise.all([
    rm(to),
    rm(`${to}.ps1`),
    opts.createCmdFile && rm(`${to}.cmd`)
  ])
    .then(() => writeShim(src, to, opts))
}