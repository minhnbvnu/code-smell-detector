function findInPhrasingContainer(ancestors) {
      /** @type {Array<[ancestors: Array<Nodes>, brackets: Array<number>]>} */
      const bracketRanges = []
      const node = ancestors.at(-1)
      assert(node) // Always defined.
      assert('children' in node) // Always defined.

      for (const child of node.children) {
        if (child.type === 'text') {
          findRangesInText(bracketRanges, [...ancestors, child])
        } else if ('children' in child) {
          findInPhrasingContainer([...ancestors, child])
        }
      }

      // Remaining ranges.
      for (const range of bracketRanges) {
        handleRange(range)
      }
    }