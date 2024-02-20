async function getOrDownloadFile (destPath, url, ignoreCertificateError = true) {
  const _path = process.cwd()
  let dest = path.join(_path, 'data', 'chatgpt', destPath)
  const p = path.dirname(dest)
  mkdirs(p)
  if (fs.existsSync(dest)) {
    return dest
  } else {
    return await downloadFile(url, destPath, false, ignoreCertificateError)
  }
}