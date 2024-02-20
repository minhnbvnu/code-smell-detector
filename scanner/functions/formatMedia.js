function formatMedia(res) {
  return res.tempFiles.map((item) =>
    Object.assign(
      Object.assign(
        {},
        pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath'])
      ),
      {
        type: res.type,
        url: item.tempFilePath,
        thumb:
          res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
      }
    )
  );
}