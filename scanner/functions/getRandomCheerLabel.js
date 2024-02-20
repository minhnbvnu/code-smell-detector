function getRandomCheerLabel() {
  if (nextCheers.length === 0) {
    genNextCheers();
  }

  return nextCheers.pop();
}