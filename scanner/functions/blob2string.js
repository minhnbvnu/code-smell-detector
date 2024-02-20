async function blob2string (blob) {
  if (platform.inBrowser) {
    let str = await (new Response(blob)).text()
    return str
  } else {
    if (blob instanceof Buffer) {
      // in nodejs we use buffers instead of blobs
      let buffer = blob
      return buffer.toString('utf8')
    } else {
      // otherwise we assume that this is a pseudo blob created with createPseudoFile
      return blob.data
    }
  }
}