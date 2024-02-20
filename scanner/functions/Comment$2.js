function Comment$2(node2, renderer, options) {
    if (options.preserveComments) {
      renderer.add_string(`<!--${node2.data}-->`);
    }
  }