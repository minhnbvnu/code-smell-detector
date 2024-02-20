function scriptOnload(node, callback) {

    node.onload = node.onerror = node.onreadystatechange = function() {
      if (READY_STATE_RE.test(node.readyState)) {

        // Ensure only run once and handle memory leak in IE
        node.onload = node.onerror = node.onreadystatechange = null

        // Remove the script to reduce memory leak
        if (node.parentNode && !config.debug) {
          head.removeChild(node)
        }

        // Dereference the node
        node = undefined

        callback()
      }
    }

  }