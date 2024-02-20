function _importManifest (rawArchive) {
  let manifestXML = rawArchive.resources['manifest.xml'].data
  let dom = DefaultDOMElement.parseXML(manifestXML)
  return dom.serialize()
}