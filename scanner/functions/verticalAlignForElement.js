function verticalAlignForElement(node, initialStyle) {
  let verticalAlign
  // why isn't there a simple way to do this??
  while(node && node.nodeType === Node.ELEMENT_NODE) {
    // tagged superscript/subscript computed style values are correct in Chrome/Firefox but not IE, use the tag first
    if(node.nodeName === 'SUP') {
      verticalAlign = 'super'
    } else if(node.nodeName === 'SUB') {
      verticalAlign = 'sub'
    } else {
      let style = initialStyle ? initialStyle : getComputedStyle(node, null)
      let nodeAlign = style.getPropertyValue('vertical-align')
      if(nodeAlign && nodeAlign.length > 0 && nodeAlign !== 'baseline') {
        verticalAlign = nodeAlign
      }
    }
    initialStyle = null
    node = node.parentNode
  }
  return verticalAlign
}