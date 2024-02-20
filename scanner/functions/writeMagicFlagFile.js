function writeMagicFlagFile(outputDir) {
  /* global Buffer: true */
  const buffer = Buffer(4);
  buffer.writeUInt32LE(MAGIC_UNBUNDLE_NUMBER);
  return writeFile(path.join(outputDir, MAGIC_UNBUNDLE_FILENAME), buffer);
}