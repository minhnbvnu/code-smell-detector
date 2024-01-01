function convertHeading (heading) {
  return heading
    .replace(/#+\s+/, '')
    .toLowerCase()
    .replace(/`\./g, '')  // Remove leading dot.
    .replace(/[`*\(\),]/g, '')  // Remove special characters.
    .replace(/[^\w]+/g, '-')
    .replace(/-$/g, '');
}