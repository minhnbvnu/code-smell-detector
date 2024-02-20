function _getTmpFolder () {
  let folder = path.join(process.cwd(), 'tmp', uuid())
  fsExtra.ensureDirSync(folder)
  return folder
}