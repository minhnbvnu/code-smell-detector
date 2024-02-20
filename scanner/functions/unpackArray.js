function unpackArray (arr) {
      var result = initNativeArray(arr.shape, 0);
      doUnpack(arr, result);
      return result;
    }