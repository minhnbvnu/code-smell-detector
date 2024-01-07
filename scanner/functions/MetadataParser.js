constructor(data) {
    data = this._repair(data);
    const parser = new _xml_parser.SimpleXMLParser({
      lowerCaseName: true
    });
    const xmlDocument = parser.parseFromString(data);
    this._metadataMap = new Map();
    this._data = data;

    if (xmlDocument) {
      this._parse(xmlDocument);
    }
  }