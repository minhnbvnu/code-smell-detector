function expectIdstring () {
    var string = idstring()
    if (!string) {
      throw new Error('Expected idstring at offset ' + index)
    }
    return string
  }