function writeEntry(spec, contract, success, url) {
  if (!hasHeader) {
    hasHeader = true;
    writeHeader();
  }
  console.log(
    formatRow(
      spec,
      contract,
      success ? ':x:' : ':heavy_check_mark:',
      url ? `[link](${url?.replace('/output/', '/jobStatus/')})` : 'error',
      url ? `[link](${url})` : 'error',
    ),
  );
}