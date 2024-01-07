function createTickContext(parent, index, tick) {
  return createContext(parent, {
    tick,
    index,
    type: 'tick'
  });
}