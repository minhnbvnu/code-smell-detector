function decodeSVG (imgData) {
  return window.decodeURIComponent(imgData.replace(cst.imgPrefix.svg, ''))
}