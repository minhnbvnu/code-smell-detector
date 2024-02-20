function handleRange(bracketRange) {
      const [ancestors, range] = bracketRange

      // `[`.
      if (range.length === 1) return

      // `[x][`.
      if (range.length === 3) range.length = 2

      // No need to warn for just `[]`.
      if (range.length === 2 && range[0] + 2 === range[1]) return

      const label =
        value.charCodeAt(range[0] - 1) === 33 /* `!` */
          ? 'image'
          : value.charCodeAt(range[0] + 1) === 94 /* `^` */
            ? 'footnote'
            : 'link'

      const offset = range.length === 4 && range[2] + 2 !== range[3] ? 2 : 0

      let id = normalizeIdentifier(
        collapseWhiteSpace(
          value.slice(range[0 + offset] + 1, range[1 + offset] - 1),
          {style: 'html', trim: true}
        )
      )
      let defined = definitionIdentifiers

      if (label === 'footnote') {
        // Footnotes can’t have spaces.
        /* c8 ignore next -- bit superfluous to test. */
        if (id.includes(' ')) return

        defined = footnoteDefinitionIdentifiers
        // Drop the `^`.
        id = id.slice(1)
      }

      if (
        (allowShortcutLink && range.length === 2) ||
        defined.has(id) ||
        strings.has(id) ||
        regexes.some(function (regex) {
          return regex.test(id)
        })
      ) {
        return
      }

      const start = toPoint(range[0])
      const end = toPoint(range[range.length - 1])

      if (end && start) {
        file.message(
          'Unexpected reference to undefined definition, expected corresponding definition (`' +
            id.toLowerCase() +
            '`) for ' +
            (label === 'image' ? 'an' : 'a') +
            ' ' +
            label +
            ' or escaped opening bracket (`\\[`) for regular text',
          {
            ancestors,
            place: {start, end}
          }
        )
      }
    }