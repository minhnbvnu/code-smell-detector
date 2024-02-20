function getReq(spec, shim) {
  return shim.isFunction(spec.req) ? spec.req : makeGetReq(shim, spec.req)
}