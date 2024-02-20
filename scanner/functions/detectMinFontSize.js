function detectMinFontSize() {
  let elem = document.createElement('div')
  elem.style['font-size'] = '1px'
  elem.style.display = 'none'
  elem.style.visibility = 'hidden'
  document.body.appendChild(elem)
  let style = getComputedStyle(elem, null)
  let size = getPixelStyleProperty(style, 'font-size')
  document.body.removeChild(elem)
  return size
}