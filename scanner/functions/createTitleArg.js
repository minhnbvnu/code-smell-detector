function createTitleArg(title) {
  if (title) {
    return [
      windowsOnly('/t:') + title
    ];
  }
  return [];
}