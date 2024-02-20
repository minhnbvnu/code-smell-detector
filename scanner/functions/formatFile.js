function formatFile(res) {
  return res.tempFiles.map((item) =>
    Object.assign(Object.assign({}, pickExclude(item, ['path'])), {
      url: item.path,
    })
  );
}