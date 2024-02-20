function mockProcRead(data, v2) {
  if (!v2) {
    common.readProc.onCall(0).yields(null, null)
    common.readProc.onCall(1).yields(null, data)
  } else {
    common.readProc.onCall(0).yields(null, data)
  }
}