function findCycles(g) {
  return tarjan(g).filter(function(cmpt) { return cmpt.length > 1; });
}