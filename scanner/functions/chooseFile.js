function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
}) {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case 'image':
        wx.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType,
          success: (res) => resolve(formatImage(res)),
          fail: reject,
        });
        break;
      case 'media':
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration,
          sizeType,
          camera,
          success: (res) => resolve(formatMedia(res)),
          fail: reject,
        });
        break;
      case 'video':
        wx.chooseVideo({
          sourceType: capture,
          compressed,
          maxDuration,
          camera,
          success: (res) => resolve(formatVideo(res)),
          fail: reject,
        });
        break;
      default:
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: (res) => resolve(formatFile(res)),
          fail: reject,
        });
        break;
    }
  });
}