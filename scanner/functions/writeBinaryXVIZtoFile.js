function writeBinaryXVIZtoFile(sink, directory, name, json, options) {
  const glbFileBuffer = encodeBinaryXVIZ(json, options);
  /* global Buffer */
  sink.writeSync(directory, `${name}.glb`, Buffer.from(glbFileBuffer), {flag: 'w'});
  return glbFileBuffer;
}