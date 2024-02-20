function checkStart(index, place, ancestors) {
      let code = value.charCodeAt(index)

      /* c8 ignore next 3 -- parser currently places indent outside. */
      while (code === 9 /* `\t` */ || code === 32 /* ` ` */) {
        code = value.charCodeAt(++index)
      }

      if (code !== 124 /* `|` */) {
        file.message('Unexpected missing closing pipe in row, expected `|`', {
          ancestors,
          place
        })
      }
    }