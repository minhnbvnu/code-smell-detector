function createCSS(cssText, id) {
    var elem = document.getElementById(id)
    if (elem) return

    elem = document.createElement('style')
    elem.id = id
    document.getElementsByTagName('head')[0].appendChild(elem)

    if (elem.styleSheet) { // IE
      elem.styleSheet.cssText = cssText
    } else { // W3C
      elem.appendChild(document.createTextNode(cssText))
    }
  }