function hasForwardedSlots(children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      switch (child.type) {
        case 1:
          if (child.tagType === 2 || hasForwardedSlots(child.children)) {
            return true;
          }
          break;
        case 9:
          if (hasForwardedSlots(child.branches))
            return true;
          break;
        case 10:
        case 11:
          if (hasForwardedSlots(child.children))
            return true;
          break;
      }
    }
    return false;
  }