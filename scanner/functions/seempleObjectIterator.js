function seempleObjectIterator() {
  const keys = this.keys();
  let i = 0;

  return {
    next: () => {
      if (i > keys.length - 1) {
        return { done: true };
      }

      return {
        done: false,
        value: this[keys[i++]] // eslint-disable-line no-plusplus
      };
    }
  };
}