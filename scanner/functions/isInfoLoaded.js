function isInfoLoaded(globalState, id) {
  return globalState.chapters.entities[id] && globalState.chapters.infos[id];
}