async function* makeBinaryGeometryIterator(geojsonIterator) {
    for await (const batch of geojsonIterator) {
      batch.data = geojsonToBinary(batch.data);
      yield batch;
    }
  }