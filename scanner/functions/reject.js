function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }