function timedOut() {
      self._timedOut = true
      self.request.abort()
    }