function _getentropy(buffer, size) {
      if (!_getentropy.randomDevice) {
        _getentropy.randomDevice = getRandomDevice();
      }
      for (var i = 0; i < size; i++) {
        HEAP8[(((buffer)+(i))>>0)] = _getentropy.randomDevice()
      }
      return 0;
    }