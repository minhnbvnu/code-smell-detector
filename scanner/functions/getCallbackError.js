function getCallbackError(stub, func, args) {
    if (stub.callArgAtsLast < 0) {
      var msg;

      if (stub.callArgPropsLast) {
        msg = sinon.functionName(stub) +
          " expected to yield to '" + stub.callArgPropsLast +
          "', but no object with such a property was passed."
      } else {
        msg = sinon.functionName(stub) +
          " expected to yield, but no callback was passed."
      }

      if (args.length > 0) {
        msg += " Received [" + join.call(args, ", ") + "]";
      }

      return msg;
    }

    return "argument at index " + stub.callArgAtsLast + " is not a function: " + func;
  }