function unifiedNoColor(str, opts, fileName) {
  return disparity.unifiedNoColor(str, format(str, opts), {
    paths: [fileName]
  });
}