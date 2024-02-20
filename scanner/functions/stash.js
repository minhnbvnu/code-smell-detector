function stash (text) {
      var here = stashed.length
      stashed.push(text)
      return "〖" + here + "〗"
    }