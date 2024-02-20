async function read7Bytes (file) {
  const fd = await fs.promises.open(file, 'r')
  const buf = (await fd.read(Buffer.alloc(7), 0, 7, 0)).buffer
  fd.close()
  return buf
}