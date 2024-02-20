function createDescription(desc) {
  return convInlineCodes(resolveLinks(desc || 'No description.'));
}