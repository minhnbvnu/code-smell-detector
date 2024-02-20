function attributesEqual(attr1, attr2) {
  let normalize = a => _.pick(a, value => value) // pick entries where value exists and is truthy
  return _.isEqual(normalize(attr1), normalize(attr2))
}