function expectResolvesAsset(input, expectedSource) {
  var assetId = AssetRegistry.registerAsset(input);
  expect(resolveAssetSource(assetId)).toEqual(expectedSource);
}