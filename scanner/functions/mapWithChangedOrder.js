function mapWithChangedOrder (m, props) {
  let names = new Set(m.keys())
  let result = new Map()
  props.forEach(name => {
    result.set(name, m.get(name))
    names.delete(name)
  })
  names.forEach(name => {
    result.set(name, m.get(name))
  })
  return result
}