function reduceBehaviors(styles) {
  return styles.map(x => x instanceof ElementStyles ? x.behaviors : null).reduce((prev, curr) => {
    if (curr === null) {
      return prev;
    }

    if (prev === null) {
      prev = [];
    }

    return prev.concat(curr);
  }, null);
}