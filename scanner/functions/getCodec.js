function getCodec(encoding) {
  var codec = cache[encoding];
  if (!!codec || !encoding || Object.hasOwnProperty.call(cache, encoding)) {
    return codec;
  }

  try {
    codec = new Codec(iconv.getCodec(encoding), encoding);
  } catch (err) {
    // Unsupported codec
  }

  cache[encoding] = codec;
  return codec;
}