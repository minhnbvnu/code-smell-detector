function mockPkg({package: pkg = {}, path = '/blah/package.json'}) {
  readPkgUpSyncMock.mockImplementationOnce(() => ({packageJson: pkg, path}))
}