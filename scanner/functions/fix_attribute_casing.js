function fix_attribute_casing(name2) {
    name2 = name2.toLowerCase();
    return svg_attribute_lookup.get(name2) || name2;
  }