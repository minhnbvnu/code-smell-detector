function assertExactClmAttrs(segmentStub, expectedAttrs) {
  const attrs = segmentStub.addAttribute.args
  const attrsObj = attrs.reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
  this.same(attrsObj, expectedAttrs, 'CLM attrs should match')
}