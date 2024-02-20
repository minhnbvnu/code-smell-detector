function getFilesFromClipboardData(clipboardData) {
  const files = [];

  Object.keys(clipboardData.items).forEach((key) => {
    const item = clipboardData.items[key];

    if (item.kind === 'file') {
      const file = item.getAsFile();

      if (file) files.push(file);
    }
  });

  return files;
}