function selfFulfillment () {
    return new TypeError('You cannot resolve a promise with itself')
  }