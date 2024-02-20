function hasListeners(listenable) {
  return listenable.listeners && listenable.listeners.length > 0;
}