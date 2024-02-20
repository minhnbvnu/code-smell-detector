function shouldIgnoreMutations(mutations) {
    // ignore if all mutations are about attributes changes
    return !mutations.some(m => m.type !== 'attributes');
  }