function inferTable(ancestors) {
      const node = ancestors.at(-1)
      assert(node) // Always defined.
      assert(node.type === 'table') // Always table.
      /* c8 ignore next -- `align` is optional in AST. */
      const align = node.align || []
      /** @type {Array<Entry>} */
      const result = []
      let rowIndex = -1

      // Regular rows.
      while (++rowIndex < node.children.length) {
        const row = node.children[rowIndex]
        let column = -1

        while (++column < row.children.length) {
          const node = row.children[column]

          result.push({
            align: align[column],
            ancestors: [...ancestors, row, node],
            column,
            row: rowIndex,
            size: inferSize(
              pointStart(node),
              pointEnd(node),
              column === row.children.length - 1
            )
          })
        }

        if (rowIndex === 0) {
          const alignRow = inferAlignRow(ancestors, align)
          if (alignRow) result.push(...alignRow)
        }
      }

      return result
    }