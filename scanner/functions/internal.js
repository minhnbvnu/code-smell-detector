function internal (title) {
      if (names && names.indexOf(title)!=-1) {
        return stash(`<a href=?${title}>${title}</a>`)
      } else {
        return title
      }
    }