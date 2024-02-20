function unified(str, opts, fileName) {
  return disparity.unified(str, format(str, opts), {
    paths: [fileName]
  });
}