function ensureGlobalHandlers() {
  if (globalsRegistered) { return }
  registerGlobalHandlers();
  globalsRegistered = true;
}