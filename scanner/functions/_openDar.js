function _openDar (dar) {
  let opts = {}
  switch (dar.type) {
    case 'packed': {
      debug('opening DAR from file')
      break
    }
    case 'unpacked': {
      debug('opening DAR from folder')
      opts.folder = true
      break
    }
    default:
      console.error('FIXME: invalid DAR record')
      return
  }
  _createEditorWindow(dar.file, opts)
}