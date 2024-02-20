function wrapError (func) {
  return async (req, res) => {
    try {
      await func(req, res)
    } catch (e) {
      console.error(`Error: ${e.stack}`)
      res.status(500).json(util.makeErrorResponse(e))
    }
  }
}