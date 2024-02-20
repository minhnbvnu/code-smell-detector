function makeRelation(options, vantOptions, relation) {
  const { type, name, linked, unlinked, linkChanged } = relation;
  const { beforeCreate, destroyed } = vantOptions;
  if (type === 'descendant') {
    options.created = function () {
      beforeCreate && beforeCreate.bind(this)();
      this.children = this.children || [];
    };
    options.detached = function () {
      this.children = [];
      destroyed && destroyed.bind(this)();
    };
  }
  options.relations = Object.assign(options.relations || {}, {
    [`../${name}/index`]: {
      type,
      linked(node) {
        relationFunctions[type].linked.bind(this)(node);
        linked && linked.bind(this)(node);
      },
      linkChanged(node) {
        linkChanged && linkChanged.bind(this)(node);
      },
      unlinked(node) {
        relationFunctions[type].unlinked.bind(this)(node);
        unlinked && unlinked.bind(this)(node);
      },
    },
  });
}