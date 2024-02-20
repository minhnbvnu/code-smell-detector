function useMutationObserver () {
    var iterations = 0
    var observer = new BrowserMutationObserver(flush)
    var node = document.createTextNode('')
    observer.observe(node, { characterData: true })

    return function () {
      node.data = iterations = ++iterations % 2
    }
  }