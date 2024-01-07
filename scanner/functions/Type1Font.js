function Type1Font(name, file, properties) {
    var PFB_HEADER_SIZE = 6;
    var headerBlockLength = properties.length1;
    var eexecBlockLength = properties.length2;
    var pfbHeader = file.peekBytes(PFB_HEADER_SIZE);
    var pfbHeaderPresent = pfbHeader[0] === 0x80 && pfbHeader[1] === 0x01;

    if (pfbHeaderPresent) {
      file.skip(PFB_HEADER_SIZE);
      headerBlockLength = pfbHeader[5] << 24 | pfbHeader[4] << 16 | pfbHeader[3] << 8 | pfbHeader[2];
    }

    var headerBlock = getHeaderBlock(file, headerBlockLength);
    var headerBlockParser = new _type1_parser.Type1Parser(headerBlock.stream, false, SEAC_ANALYSIS_ENABLED);
    headerBlockParser.extractFontHeader(properties);

    if (pfbHeaderPresent) {
      pfbHeader = file.getBytes(PFB_HEADER_SIZE);
      eexecBlockLength = pfbHeader[5] << 24 | pfbHeader[4] << 16 | pfbHeader[3] << 8 | pfbHeader[2];
    }

    var eexecBlock = getEexecBlock(file, eexecBlockLength);
    var eexecBlockParser = new _type1_parser.Type1Parser(eexecBlock.stream, true, SEAC_ANALYSIS_ENABLED);
    var data = eexecBlockParser.extractFontProgram(properties);

    for (const key in data.properties) {
      properties[key] = data.properties[key];
    }

    var charstrings = data.charstrings;
    var type2Charstrings = this.getType2Charstrings(charstrings);
    var subrs = this.getType2Subrs(data.subrs);
    this.charstrings = charstrings;
    this.data = this.wrap(name, type2Charstrings, this.charstrings, subrs, properties);
    this.seacs = this.getSeacs(data.charstrings);
  }