function createAsset(inputHtml) {
  return new AssetGraph().addAsset({
    type: 'Html',
    text: inputHtml,
  });
}