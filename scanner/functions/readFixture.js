function readFixture (fileName) {
  let fixture = vfs.readFileSync(`test/fixture/${fileName}`)
  return fixture
}