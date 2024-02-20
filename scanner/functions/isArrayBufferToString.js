function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }