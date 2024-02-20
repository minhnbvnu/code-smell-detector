function headerOf(elem) {
      if (!elem) return null
      if (/^H[1-6]$/.test(elem.tagName)) return elem
      return headerOf(elem.parentElement)
    }