function styleOnload(node, callback) {

    // for Old WebKit and Old Firefox
    if (isOldWebKit || isOldFirefox) {
      util.log('Start poll to fetch css')

      setTimeout(function() {
        poll(node, callback)
      }, 1) // Begin after node insertion
    }
    else {
      node.onload = node.onerror = function() {
        node.onload = node.onerror = null
        node = undefined
        callback()
      }
    }

  }