function generateCategoryBits() {
  for (let key in CATEGORY) {
    this[key] = CATEGORY[key] | 0;
  };
}