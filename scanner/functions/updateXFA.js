function updateXFA(datasetsRef, newRefs, xref) {
  if (datasetsRef === null || xref === null) {
    return;
  }

  const datasets = xref.fetchIfRef(datasetsRef);
  const str = (0, _util.bytesToString)(datasets.getBytes());
  const xml = new _xml_parser.SimpleXMLParser({
    hasAttributes: true
  }).parseFromString(str);

  for (const {
    xfa
  } of newRefs) {
    if (!xfa) {
      continue;
    }

    const {
      path,
      value
    } = xfa;

    if (!path) {
      continue;
    }

    const node = xml.documentElement.searchNode((0, _core_utils.parseXFAPath)(path), 0);

    if (node) {
      node.childNodes = [new _xml_parser.SimpleDOMNode("#text", value)];
    } else {
      (0, _util.warn)(`Node not found for path: ${path}`);
    }
  }

  const buffer = [];
  xml.documentElement.dump(buffer);
  let updatedXml = buffer.join("");
  const encrypt = xref.encrypt;

  if (encrypt) {
    const transform = encrypt.createCipherTransform(datasetsRef.num, datasetsRef.gen);
    updatedXml = transform.encryptString(updatedXml);
  }

  const data = `${datasetsRef.num} ${datasetsRef.gen} obj\n` + `<< /Type /EmbeddedFile /Length ${updatedXml.length}>>\nstream\n` + updatedXml + "\nendstream\nendobj\n";
  newRefs.push({
    ref: datasetsRef,
    data
  });
}