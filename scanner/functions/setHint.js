function setHint(xid, hint, value) {
  value = value.join(', ')
  Util.spawn(['xprop', '-id', xid, '-f', hint, '32c', '-set', hint, value])
}