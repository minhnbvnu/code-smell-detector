function getNextComponent(idx) {
  if (all[idx + 1]) {
    const nextComponentName = getNameFromPath(all[idx + 1]);

    if (shouldDisplayInSidebar(nextComponentName)) {
      return slugify(nextComponentName);
    } else {
      return getNextComponent(idx + 1);
    }
  } else {
    return 'network';
  }
}