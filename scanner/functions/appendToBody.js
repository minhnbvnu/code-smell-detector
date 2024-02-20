function appendToBody(div) {
    pollCount++

    if (document.body) {
      document.body.appendChild(div)
    }
    else if (pollCount < MAX_TRY) {
      setTimeout(function() {
        appendToBody(div)
      }, 200)
    }
  }