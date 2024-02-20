function getChangingValue(stub, property) {
    var index = stub.callCount - 1;
    var values = stub[property];
    var prop = index in values ? values[index] : values[values.length - 1];
    stub[property + "Last"] = prop;

    return prop;
  }