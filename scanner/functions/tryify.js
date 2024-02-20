function tryify (func) {
  // 确保只包装一次
  if (!func._wrapped) {
    func._wrapped = function () {
      try {
        return func.apply(this, arguments)
      } catch (error) {
        config.handleTryCatchError(error)
        window.ignoreError = true

        throw error
      }
    }
  }

  return func._wrapped
}