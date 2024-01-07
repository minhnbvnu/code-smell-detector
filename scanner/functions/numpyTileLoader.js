function numpyTileLoader(z, x, y) {
  const url = `https://api.cogeo.xyz/cog/tiles/WebMercatorQuad/${z}/${x}/${y}@1x?format=npy&url=${encodeURIComponent(
    COG,
  )}`;

  return fetch(url)
    .then((r) => r.arrayBuffer())
    .then((buffer) => NumpyLoader.fromArrayBuffer(buffer))
    .then((numpyData) => {
      // flatten the numpy data
      const dataTile = new Float32Array(256 * 256 * 5);
      const bandSize = 256 * 256;
      for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
          const px = x + y * 256;
          dataTile[px * 5 + 0] = numpyData.data[y * 256 + x];
          dataTile[px * 5 + 1] = numpyData.data[bandSize + y * 256 + x];
          dataTile[px * 5 + 2] = numpyData.data[bandSize * 2 + y * 256 + x];
          dataTile[px * 5 + 3] = numpyData.data[bandSize * 3 + y * 256 + x];
          dataTile[px * 5 + 4] =
            numpyData.data[bandSize * 4 + y * 256 + x] > 0 ? 1.0 : 0;
        }
      }
      return dataTile;
    });
}