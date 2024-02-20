function moveDisks(n, innerSource, innerHelper, innerTarget) {
    if (n <= 0) { return; }

    moveDisks(n - 1, innerSource, innerTarget, innerHelper);
    innerTarget.push(innerSource.pop());
    moveDisks(n - 1, innerHelper, innerSource, innerTarget);
  }