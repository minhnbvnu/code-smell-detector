function updateTitle(text) {
      document.title = document.title.replace(
        /(:.*)?$/,
        ': ' +
          text
            .replace(/\s+/g, ' ')
            .substring(0, 1000)
            .trim()
      )
    }