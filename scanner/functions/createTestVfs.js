function createTestVfs (seedXML) {
  let data = {
    "test/manifest.xml": "<dar>\n  <documents>\n    <document id=\"manuscript\" type=\"article\" path=\"manuscript.xml\" />\n  </documents>\n  <assets>\n  </assets>\n</dar>\n", //eslint-disable-line
    "test/manuscript.xml": seedXML, //eslint-disable-line
  }
  return new Vfs(data)
}