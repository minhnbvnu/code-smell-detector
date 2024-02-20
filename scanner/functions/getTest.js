function getTest() {
  return {
    func: function (req, res, next) {
      next()
    }
  }
}