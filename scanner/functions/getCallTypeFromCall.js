function getCallTypeFromCall (call) {
  const name = Object.getPrototypeOf(call).constructor.name

  if (name.indexOf('ServerUnaryCall') === 0) {
    return CallType.UNARY
  } else if (name.indexOf('ServerWritableStream') === 0) {
    return CallType.RESPONSE_STREAM
  } else if (name.indexOf('ServerReadableStream') === 0) {
    return CallType.REQUEST_STREAM
  } else if (name.indexOf('ServerDuplexStream') === 0) {
    return CallType.DUPLEX
  }
}