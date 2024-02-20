function registerComponentForCache (options, write) {
  // exposed by vue-loader, need to call this if cache hit because
  // component lifecycle hooks will not be called.
  var register = options._ssrRegister;
  if (write.caching && isDef(register)) {
    write.componentBuffer[write.componentBuffer.length - 1].add(register);
  }
  return register
}