function formatVideo(res) {
  return [
    Object.assign(
      Object.assign(
        {},
        pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg'])
      ),
      { type: 'video', url: res.tempFilePath, thumb: res.thumbTempFilePath }
    ),
  ];
}