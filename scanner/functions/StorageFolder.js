constructor(containingPath) {
    if (containingPath) {
      this.path = path.join(containingPath, 'storage');
    }
  }