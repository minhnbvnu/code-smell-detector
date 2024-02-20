async function getPttBuffer (file, ffmpeg = 'ffmpeg') {
  let buffer
  let time
  if (file instanceof Buffer || file.startsWith('base64://')) {
    // Buffer或base64
    const buf = file instanceof Buffer ? file : Buffer.from(file.slice(9), 'base64')
    const head = buf.slice(0, 7).toString()
    if (head.includes('SILK') || head.includes('AMR')) {
      return buf
    } else {
      const tmpfile = TMP_DIR + '/' + (0, uuid)()
      await fs.promises.writeFile(tmpfile, buf)
      return audioTrans(tmpfile, ffmpeg)
    }
  } else if (file.startsWith('http://') || file.startsWith('https://')) {
    try {
      const headers = {
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI 9 Build/SKQ1.211230.001)'
      }
      let response = await fetch(file, {
        method: 'GET', // post请求
        headers
      })
      const buf = Buffer.from(await response.arrayBuffer())
      const tmpfile = TMP_DIR + '/' + (0, uuid)()
      await fs.promises.writeFile(tmpfile, buf)
      // await (0, pipeline)(readable.pipe(new DownloadTransform), fs.createWriteStream(tmpfile));
      const head = await read7Bytes(tmpfile)
      if (head.includes('SILK') || head.includes('AMR')) {
        fs.unlink(tmpfile, NOOP)
        buffer = buf
      } else {
        buffer = await audioTrans(tmpfile, ffmpeg)
      }
    } catch (err) {}
  } else {
    // 本地文件
    file = String(file).replace(/^file:\/{2}/, '')
    IS_WIN && file.startsWith('/') && (file = file.slice(1))
    const head = await read7Bytes(file)
    if (head.includes('SILK') || head.includes('AMR')) {
      buffer = await fs.promises.readFile(file)
    } else {
      buffer = await audioTrans(file, ffmpeg)
    }
  }
  return { buffer, time }
}