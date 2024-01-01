function checkProse (pagePath, content) {
  content = content.replace(/^---[\s\S]*?---/g, '');  // Remove metadata.
  content = content.replace(/(\|.*\|)+/g, '');  // Remove tables.
  content = content.replace(/```[\s\S]*?```/g, '');  // Remove code blocks.
  content = content.replace(/`[\s\S]*?`/g, '');  // Remove inline code.
  content = content.replace(/\n#+.*/g, '');  // Remove headings.
  writeGood(content, {adverb: false, illusion: false}).forEach(function add (error) {
    addWarning(
      pagePath,
      `...${content.substring(error.index - 10, error.index + error.offset + 10).replace(/\n/g, '')}...`,
      error.reason);
  });
}