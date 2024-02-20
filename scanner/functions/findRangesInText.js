function findRangesInText(ranges, ancestors) {
      const node = ancestors.at(-1)
      assert(node) // Always defined.
      const end = pointEnd(node)
      const start = pointStart(node)

      // Bail if there’s no positional info.
      if (
        !end ||
        !start ||
        typeof start.offset !== 'number' ||
        typeof end.offset !== 'number'
      ) {
        return
      }

      const source = value.slice(start.offset, end.offset)
      /** @type {Array<[number, string]>} */
      const lines = [[start.offset, '']]
      let last = 0

      lineEndingExpression.lastIndex = 0
      let match = lineEndingExpression.exec(source)

      while (match) {
        const index = match.index
        const lineTuple = lines.at(-1)
        assert(lineTuple) // Always defined.
        lineTuple[1] = source.slice(last, index)

        last = index + match[0].length
        lines.push([start.offset + last, ''])
        match = lineEndingExpression.exec(source)
      }

      const lineTuple = lines.at(-1)
      assert(lineTuple) // Always defined.
      lineTuple[1] = source.slice(last)

      for (const lineTuple of lines) {
        const [lineStart, line] = lineTuple
        let index = 0

        while (index < line.length) {
          const code = line.charCodeAt(index)

          // Opening bracket.
          if (code === 91 /* `[` */) {
            ranges.push([ancestors, [lineStart + index]])
            index++
          }
          // Skip escaped brackets.
          else if (code === 92 /* `\` */) {
            const next = line.charCodeAt(index + 1)

            index++

            if (next === 91 /* `[` */ || next === 93 /* `]` */) {
              index++
            }
          }
          // Close bracket.
          else if (code === 93 /* `]` */) {
            const bracketInfo = ranges.at(-1)

            // No opening, ignore.
            if (!bracketInfo) {
              index++
            }
            // `][`.
            else if (
              line.charCodeAt(index + 1) === 91 /* `[` */ &&
              // That would be the end of a reference already.
              bracketInfo[1].length !== 3
            ) {
              index++
              bracketInfo[1].push(lineStart + index, lineStart + index)
              index++
            }
            // `]` with earlier `[`.
            else {
              index++
              bracketInfo[1].push(lineStart + index)
              handleRange(bracketInfo)
              ranges.pop()
            }
          }
          // Anything else.
          else {
            index++
          }
        }
      }
    }