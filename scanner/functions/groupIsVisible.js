function groupIsVisible(group) {
    if (group.hidden) return;
    return some(group.pageItems, itemIsVisible) ||
      some(group.groupItems, groupIsVisible);
  }