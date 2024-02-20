function getXid(win) {
  const desc  = win.get_description()
  const match = desc && desc.match(/0x[0-9a-f]+/)

  return match && match[0]
}