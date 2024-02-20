function inferAlignRow(ancestors, align) {
      const node = ancestors.at(-1)
      assert(node) // Always defined.
      assert(node.type === 'table') // Always table.
      const headEnd = pointEnd(node.children[0])

      if (!headEnd || typeof headEnd.offset !== 'number') return

      let index = headEnd.offset

      if (value.charCodeAt(index) === 13 /* `\r` */) index++
      /* c8 ignore next -- should never happen, alignment is needed. */
      if (value.charCodeAt(index) !== 10 /* `\n` */) return

      index++

      /** @type {Array<Entry>} */
      const result = []
      const line = headEnd.line + 1
      // Alignment row can only be on the second line,
      // so containers can only indent with `>` or spaces.
      let code = value.charCodeAt(index)
      while (
        code === 9 /* `\t` */ ||
        code === 32 /* ` ` */ ||
        code === 62 /* `>` */
      ) {
        index++
        code = value.charCodeAt(index)
      }

      /* c8 ignore next 7 -- should always be found. */
      if (
        code !== 45 /* `-` */ &&
        code !== 58 /* `:` */ &&
        code !== 124 /* `|` */
      ) {
        return
      }

      let lineEndOffset = value.indexOf('\n', index)
      if (lineEndOffset === -1) lineEndOffset = value.length
      if (value.charCodeAt(lineEndOffset - 1) === 13 /* `\r` */) lineEndOffset--

      let column = 0
      let cellStart = index
      let cellEnd = value.indexOf('|', index + (code === 124 ? 1 : 0))
      if (cellEnd === -1 || cellEnd > lineEndOffset) {
        cellEnd = lineEndOffset
      }

      while (cellStart !== cellEnd) {
        let nextCellEnd = value.indexOf('|', cellEnd + 1)

        if (nextCellEnd === -1 || nextCellEnd > lineEndOffset) {
          nextCellEnd = lineEndOffset
        }

        // Check if the trail is empty,
        // which means it’s a closing pipe with trailing whitespace.
        if (nextCellEnd === lineEndOffset) {
          let maybeEnd = lineEndOffset
          let code = value.charCodeAt(maybeEnd - 1)
          while (code === 9 /* `\t` */ || code === 32 /* ` ` */) {
            maybeEnd--
            code = value.charCodeAt(maybeEnd - 1)
          }

          if (cellEnd + 1 === maybeEnd) {
            cellEnd = lineEndOffset
          }
        }

        result.push({
          align: align[column],
          ancestors,
          column,
          row: undefined,
          size: inferSize(
            {
              line,
              column: cellStart - index + 1,
              offset: cellStart
            },
            {line, column: cellEnd - index + 1, offset: cellEnd},
            cellEnd === lineEndOffset
          )
        })

        cellStart = cellEnd
        cellEnd = nextCellEnd
        column++
      }

      return result
    }