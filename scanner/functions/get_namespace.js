function get_namespace(parent, element, explicit_namespace) {
    const parent_element = parent.find_nearest(/^Element/);
    if (!parent_element) {
      return explicit_namespace || (is_svg(element.name) ? namespaces.svg : null);
    }
    if (parent_element.namespace !== namespaces.foreign) {
      if (is_svg(element.name.toLowerCase()))
        return namespaces.svg;
      if (parent_element.name.toLowerCase() === "foreignobject")
        return null;
    }
    return parent_element.namespace;
  }