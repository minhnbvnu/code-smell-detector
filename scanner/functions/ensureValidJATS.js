function ensureValidJATS (t, app) {
  // Note: in the test suite we use VFS as storage which works
  // synchronously, even if the API is asynchronous (for the real storage impls).
  app._save(err => {
    t.notOk(Boolean(err), JATS_SHOULD_BE_VALID)
  })
}