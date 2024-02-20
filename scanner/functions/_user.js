function _user () {
  if (_cookie()) {
    if ((getuser())['source'] && (getuser())['source'] === 'wx') {
      return (_cookie())['wxuin'].slice(1)
    } else {
      return (_cookie())['luin'].slice(1)
    }
  }
  return ''
}