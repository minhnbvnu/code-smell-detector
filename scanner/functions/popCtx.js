function popCtx() {
  return contexts.length===0 ? {} : contexts.pop();
}