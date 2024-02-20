function get_namespace$1(parent, explicit_namespace) {
    const parent_element = parent.find_nearest(/^Element/);
    if (!parent_element) {
      return explicit_namespace;
    }
    return parent_element.namespace;
  }