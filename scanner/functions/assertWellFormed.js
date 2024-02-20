function assertWellFormed(cond, msg) {
  if (!cond)
    malformed(msg);
}