function is_parent(parent, elements) {
    let check = false;
    while (parent) {
      const parent_name = parent.name;
      if (elements.includes(parent_name)) {
        check = true;
        break;
      }
      if (parent.type === "Element") {
        break;
      }
      parent = parent.parent;
    }
    return check;
  }