function checkSide(side, info, sizes) {
      if (!info.size) {
        return
      }

      const actual = info.size[side]

      if (actual === undefined) {
        return
      }

      const alignSpaces = sizes[info.column] - info.size.middle
      const min = expected === 'compact' ? 0 : 1
      /** @type {number} */
      let max = min

      if (info.align === 'center') {
        max += Math.ceil(alignSpaces / 2)
      } else if (info.align === 'right' ? side === 'left' : side === 'right') {
        max += alignSpaces
      }

      // For empty cells,
      // the `left` field is used for all the whitespace in them.
      if (info.size.middle === 0) {
        if (side === 'right') return
        max = Math.max(max, sizes[info.column] + 2 * min)
      }

      if (actual < min || actual > max) {
        const differenceMin = min - actual
        const differenceMinAbsolute = Math.abs(differenceMin)
        const differenceMax = max - actual
        const differenceMaxAbsolute = Math.abs(differenceMax)

        file.message(
          'Unexpected `' +
            actual +
            '` ' +
            pluralize('space', actual) +
            ' between cell ' +
            (side === 'left' ? 'edge' : 'content') +
            ' and ' +
            (side === 'left' ? 'content' : 'edge') +
            ', expected ' +
            (min === max ? '' : 'between `' + min + '` (unaligned) and ') +
            '`' +
            max +
            '` ' +
            (min === max ? '' : '(aligned) ') +
            pluralize('space', max) +
            ', ' +
            (differenceMin < 0 ? 'remove' : 'add') +
            (differenceMin === differenceMax
              ? ''
              : ' between `' + differenceMaxAbsolute + '` and') +
            ' `' +
            differenceMinAbsolute +
            '` ' +
            pluralize('space', differenceMinAbsolute),
          {
            ancestors: info.ancestors,
            cause,
            place: side === 'left' ? info.size.leftPoint : info.size.rightPoint
          }
        )
      }
    }