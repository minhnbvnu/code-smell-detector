function Explorer({
  value,
  defaultExpanded,
  renderer = DefaultRenderer,
  pageSize = 100,
  depth = 0,
  ...rest
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  const toggle = set => {
    setExpanded(old => (typeof set !== 'undefined' ? set : !old))
  }

  const path = []

  let type = typeof value
  let subEntries
  let subEntryPages = []

  const makeProperty = sub => {
    const newPath = path.concat(sub.label)
    const subDefaultExpanded =
      defaultExpanded === true
        ? { [sub.label]: true }
        : defaultExpanded?.[sub.label]
    return {
      ...sub,
      path: newPath,
      depth: depth + 1,
      defaultExpanded: subDefaultExpanded,
    }
  }

  if (Array.isArray(value)) {
    type = 'array'
    subEntries = value.map((d, i) =>
      makeProperty({
        label: i,
        value: d,
      })
    )
  } else if (
    value !== null &&
    typeof value === 'object' &&
    typeof value[Symbol.iterator] === 'function'
  ) {
    type = 'Iterable'
    subEntries = Array.from(value, (val, i) =>
      makeProperty({
        label: i,
        value: val,
      })
    )
  } else if (typeof value === 'object' && value !== null) {
    type = 'object'
    subEntries = Object.entries(value).map(([label, value]) =>
      makeProperty({
        label,
        value,
      })
    )
  }

  if (subEntries) {
    let i = 0

    while (i < subEntries.length) {
      subEntryPages.push(subEntries.slice(i, i + pageSize))
      i = i + pageSize
    }
  }

  return renderer({
    handleEntry: entry => (
      <Explorer key={entry.label} renderer={renderer} {...rest} {...entry} />
    ),
    type,
    subEntries,
    subEntryPages,
    depth,
    value,
    path,
    expanded,
    toggle,
    pageSize,
    ...rest,
  })
}