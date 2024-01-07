function parseCff(data, start, end, seacAnalysisEnabled) {
    const properties = {};
    const parser = new _cff_parser.CFFParser(new _stream.Stream(data, start, end - start), properties, seacAnalysisEnabled);
    const cff = parser.parse();
    return {
      glyphs: cff.charStrings.objects,
      subrs: cff.topDict.privateDict && cff.topDict.privateDict.subrsIndex && cff.topDict.privateDict.subrsIndex.objects,
      gsubrs: cff.globalSubrIndex && cff.globalSubrIndex.objects,
      isCFFCIDFont: cff.isCIDFont,
      fdSelect: cff.fdSelect,
      fdArray: cff.fdArray
    };
  }