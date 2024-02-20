function _resyncKey() {
  if (!this.container) return;
  if (this.node === this.container[this.key]) return;

  if (Array.isArray(this.container)) {
    for (let i = 0; i < this.container.length; i++) {
      if (this.container[i] === this.node) {
        return this.setKey(i);
      }
    }
  } else {
    for (const key of Object.keys(this.container)) {
      if (this.container[key] === this.node) {
        return this.setKey(key);
      }
    }
  }

  this.key = null;
}