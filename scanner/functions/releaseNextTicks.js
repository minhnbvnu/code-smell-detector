function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
}