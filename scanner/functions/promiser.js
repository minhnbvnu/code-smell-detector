function promiser (mockResolveValue, mockRejectedValue) {
  return {
    promise: function () {
      return !mockRejectedValue ? Promise.resolve(mockResolveValue) : Promise.reject(mockRejectedValue)
    }
  }
}