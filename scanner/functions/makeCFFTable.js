function makeCFFTable(glyphs, options) {
    var t = new table.Table('CFF ', [
        {name: 'header', type: 'TABLE'},
        {name: 'nameIndex', type: 'TABLE'},
        {name: 'topDictIndex', type: 'TABLE'},
        {name: 'stringIndex', type: 'TABLE'},
        {name: 'globalSubrIndex', type: 'TABLE'},
        {name: 'charsets', type: 'TABLE'},
        {name: 'charStringsIndex', type: 'TABLE'},
        {name: 'privateDictIndex', type: 'TABLE'}
    ]);

    var fontScale = 1 / options.unitsPerEm;
    // We use non-zero values for the offsets so that the DICT encodes them.
    // This is important because the size of the Top DICT plays a role in offset calculation,
    // and the size shouldn't change after we've written correct offsets.
    var attrs = {
        version: options.version,
        fullName: options.fullName,
        familyName: options.familyName,
        weight: options.weightName,
        fontMatrix: [fontScale, 0, 0, fontScale, 0, 0],
        charset: 999,
        encoding: 0,
        charStrings: 999,
        private: [0, 999]
    };

    var privateAttrs = {};

    var glyphNames = [];
    var glyph;

    // Skip first glyph (.notdef)
    for (var i = 1; i < glyphs.length; i += 1) {
        glyph = glyphs.get(i);
        glyphNames.push(glyph.name);
    }

    var strings = [];

    t.header = makeHeader();
    t.nameIndex = makeNameIndex([options.postScriptName]);
    var topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);
    t.globalSubrIndex = makeGlobalSubrIndex();
    t.charsets = makeCharsets(glyphNames, strings);
    t.charStringsIndex = makeCharStringsIndex(glyphs);
    var privateDict = makePrivateDict(privateAttrs, strings);
    t.privateDictIndex = makePrivateDictIndex(privateDict);

    // Needs to come at the end, to encode all custom strings used in the font.
    t.stringIndex = makeStringIndex(strings);

    var startOffset = t.header.sizeOf() +
        t.nameIndex.sizeOf() +
        t.topDictIndex.sizeOf() +
        t.stringIndex.sizeOf() +
        t.globalSubrIndex.sizeOf();
    attrs.charset = startOffset;

    // We use the CFF standard encoding; proper encoding will be handled in cmap.
    attrs.encoding = 0;
    attrs.charStrings = attrs.charset + t.charsets.sizeOf();
    attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();

    // Recreate the Top DICT INDEX with the correct offsets.
    topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);

    return t;
}