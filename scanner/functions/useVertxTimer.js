function useVertxTimer () {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush)
      }
    }

    return useSetTimeout()
  }