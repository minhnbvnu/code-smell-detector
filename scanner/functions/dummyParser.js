function dummyParser(self) {
  return {
    end: function () {
      self.ended = true;
      self._maybeEnd();
      return null;
    }
  };
}