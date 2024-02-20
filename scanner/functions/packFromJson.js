async function packFromJson(files) {
  const zip = new JSZip();

  _.forEach(files, (content, path) => {
    zip.file(path, content);
  });

  return await generateAsync(zip);
}