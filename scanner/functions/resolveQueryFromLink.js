function resolveQueryFromLink(from, to) {
  return appState.pattern.replace('[query]', from).replace('...', to);
}