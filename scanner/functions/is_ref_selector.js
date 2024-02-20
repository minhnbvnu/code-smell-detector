function is_ref_selector(a, b2) {
    if (!b2)
      return false;
    return a.type === "TypeSelector" && a.name === "ref" && b2.type === "PseudoClassSelector";
  }