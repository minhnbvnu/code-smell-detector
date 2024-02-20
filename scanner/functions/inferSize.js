function inferSize(start, end, tailCell) {
      if (
        end &&
        start &&
        typeof end.offset === 'number' &&
        typeof start.offset === 'number'
      ) {
        let leftIndex = start.offset
        /** @type {number | undefined} */
        let left
        /** @type {number | undefined} */
        let right

        if (value.charCodeAt(leftIndex) === 124 /* `|` */) {
          left = 0
          leftIndex++

          while (value.charCodeAt(leftIndex) === 32) {
            left++
            leftIndex++
          }
        }
        // Else, A leading pipe can only be omitted in the first cell.
        // Where we never want leading whitespace, as it’s seen as
        // indentation, and could turn into an indented block.

        let rightIndex = end.offset

        // The final pipe, if it exists, is part of the last cell in a row
        // according to positional info.
        if (tailCell) {
          while (value.charCodeAt(rightIndex - 1) === 32) {
            rightIndex--
          }

          // Found a pipe: we expect more whitespace.
          if (
            rightIndex > leftIndex &&
            value.charCodeAt(rightIndex - 1) === 124 /* `|` */
          ) {
            rightIndex--
          }
          // No pipe at the last cell: the trailing whitespace is part of
          // the cell.
          else {
            rightIndex = end.offset
          }
        }

        /** @type {number} */
        const rightEdgeIndex = rightIndex

        if (value.charCodeAt(rightIndex) === 124 /* `|` */) {
          right = 0

          while (
            rightIndex - 1 > leftIndex &&
            value.charCodeAt(rightIndex - 1) === 32
          ) {
            right++
            rightIndex--
          }
        }
        // Else, a trailing pipe can only be omitted in the last cell.
        // Where we never want trailing whitespace.

        return {
          left,
          leftPoint: {
            line: start.line,
            column: start.column + (leftIndex - start.offset),
            offset: leftIndex
          },
          middle: rightIndex - leftIndex,
          right,
          rightPoint: {
            line: end.line,
            column: end.column - (end.offset - rightEdgeIndex),
            offset: rightEdgeIndex
          }
        }
      }
    }