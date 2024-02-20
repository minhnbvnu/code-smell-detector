function complete() {
      self.result.status = self.status();
      self.resultCallback(self.result);

      if (onComplete) {
        onComplete();
      }
    }