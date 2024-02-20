function scopeFilter(flags, dep) {
  if (validScopeRegex.test(flags.scope)) {
    return dep.name.startsWith(flags.scope);
  }
  return true;
}