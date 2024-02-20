function should_cache(attribute) {
    return attribute.is_src || attribute.node.should_cache();
  }