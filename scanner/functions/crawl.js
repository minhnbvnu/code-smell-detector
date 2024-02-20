function crawl(map, value, object) {
  let names = object ? Object.getOwnPropertyNames(value) : STANDARD_GLOBALS
  let properties = []

  for (let name of names) {
    let descriptor = Object.getOwnPropertyDescriptor(value, name)

    if (Object(descriptor.value) !== descriptor.value) continue
    if (map.has(descriptor.value)) continue

    let property = {type: 'Identifier', name}
    if (object) property = {type: 'MemberExpression', object, property}

    map.set(descriptor.value, property)

    properties.push({value: descriptor.value, object: property})
  }

  for (let property of properties) {
    crawl(map, property.value, property.object)
  }

  return map
}