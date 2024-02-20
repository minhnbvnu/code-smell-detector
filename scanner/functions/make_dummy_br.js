function make_dummy_br(overrides = {}) {
  return Object.assign({
    updateFirstIndex() {},
    _components: {
      navbar: {
        updateNavIndexThrottled() {},
      },
    },
    data: [],
  }, overrides);
}