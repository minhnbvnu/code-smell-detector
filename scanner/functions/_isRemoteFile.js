function _isRemoteFile (href) {
  return Boolean(/^\w+:\/\//.exec(href))
}