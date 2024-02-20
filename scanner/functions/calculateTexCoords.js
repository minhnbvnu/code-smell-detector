function calculateTexCoords({uCount, vCount}) {
  const texCoords = new Float32Array((uCount + 1) * (vCount + 1) * 2);

  let i = 0;
  for (let vIndex = 0; vIndex <= vCount; vIndex++) {
    for (let uIndex = 0; uIndex <= uCount; uIndex++) {
      texCoords[i++] = uIndex / uCount;
      texCoords[i++] = vIndex / vCount;
    }
  }

  return {value: texCoords, size: 2};
}