function getMockModuleNoNative() {
    function PG(clientConstructor) {
      this.Client = clientConstructor
    }

    function DefaultClient() {}
    DefaultClient.prototype.query = function () {}
    function NativeClient() {}
    NativeClient.prototype.query = function () {}

    const mockPg = new PG(DefaultClient)
    mockPg.__defineGetter__('native', function () {
      return null
    })
    return mockPg
  }