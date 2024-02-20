function buildFileRequestSnippet (filesInfo) {
  if (!filesInfo || filesInfo.numberOfFiles === 0) {
    return '';
  }
  let files = [];
  for (let index = 0; index < filesInfo.numberOfFiles; index++) {
    files.push(`file = file${index}`);
  }
  return `${files.join(', ')}, `;
}