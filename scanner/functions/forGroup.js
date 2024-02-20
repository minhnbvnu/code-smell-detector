function forGroup(group) {
    if (group.hidden) return;
    forEach(group.pageItems, forPageItem);
    forEach(group.groupItems, forGroup);
  }