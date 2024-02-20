function parseJSONChunk(glb, dataView, byteOffset, chunkLength, options) {
  // 1. Create a "view" of the binary encoded JSON data inside the GLB
  const jsonChunk = new Uint8Array(dataView.buffer, byteOffset, chunkLength);

  // 2. Decode the JSON binary array into clear text
  const textDecoder = new TextDecoder('utf8');
  const jsonText = textDecoder.decode(jsonChunk);

  // 3. Parse the JSON text into a JavaScript data structure
  glb.json = JSON.parse(jsonText);
}