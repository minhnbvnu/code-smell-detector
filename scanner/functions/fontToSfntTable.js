function fontToSfntTable(font) {
    var xMins = [];
    var yMins = [];
    var xMaxs = [];
    var yMaxs = [];
    var advanceWidths = [];
    var leftSideBearings = [];
    var rightSideBearings = [];
    var firstCharIndex;
    var lastCharIndex = 0;
    var ulUnicodeRange1 = 0;
    var ulUnicodeRange2 = 0;
    var ulUnicodeRange3 = 0;
    var ulUnicodeRange4 = 0;

    for (var i = 0; i < font.glyphs.length; i += 1) {
        var glyph = font.glyphs.get(i);
        var unicode = glyph.unicode | 0;
        if (firstCharIndex > unicode || firstCharIndex === null) {
            firstCharIndex = unicode;
        }

        if (lastCharIndex < unicode) {
            lastCharIndex = unicode;
        }

        var position = os2.getUnicodeRange(unicode);
        if (position < 32) {
            ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
            ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
            ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
            ulUnicodeRange4 |= 1 << position - 96;
        } else {
            throw new Error('Unicode ranges bits > 123 are reserved for internal usage');
        }
        // Skip non-important characters.
        if (glyph.name === '.notdef') continue;
        var metrics = glyph.getMetrics();
        xMins.push(metrics.xMin);
        yMins.push(metrics.yMin);
        xMaxs.push(metrics.xMax);
        yMaxs.push(metrics.yMax);
        leftSideBearings.push(metrics.leftSideBearing);
        rightSideBearings.push(metrics.rightSideBearing);
        advanceWidths.push(glyph.advanceWidth);
    }

    var globals = {
        xMin: Math.min.apply(null, xMins),
        yMin: Math.min.apply(null, yMins),
        xMax: Math.max.apply(null, xMaxs),
        yMax: Math.max.apply(null, yMaxs),
        advanceWidthMax: Math.max.apply(null, advanceWidths),
        advanceWidthAvg: average(advanceWidths),
        minLeftSideBearing: Math.min.apply(null, leftSideBearings),
        maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
        minRightSideBearing: Math.min.apply(null, rightSideBearings)
    };
    globals.ascender = font.ascender !== undefined ? font.ascender : globals.yMax;
    globals.descender = font.descender !== undefined ? font.descender : globals.yMin;

    var headTable = head.make({
        unitsPerEm: font.unitsPerEm,
        xMin: globals.xMin,
        yMin: globals.yMin,
        xMax: globals.xMax,
        yMax: globals.yMax
    });

    var hheaTable = hhea.make({
        ascender: globals.ascender,
        descender: globals.descender,
        advanceWidthMax: globals.advanceWidthMax,
        minLeftSideBearing: globals.minLeftSideBearing,
        minRightSideBearing: globals.minRightSideBearing,
        xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
        numberOfHMetrics: font.glyphs.length
    });

    var maxpTable = maxp.make(font.glyphs.length);

    var os2Table = os2.make({
        xAvgCharWidth: Math.round(globals.advanceWidthAvg),
        usWeightClass: 500, // Medium FIXME Make this configurable
        usWidthClass: 5, // Medium (normal) FIXME Make this configurable
        usFirstCharIndex: firstCharIndex,
        usLastCharIndex: lastCharIndex,
        ulUnicodeRange1: ulUnicodeRange1,
        ulUnicodeRange2: ulUnicodeRange2,
        ulUnicodeRange3: ulUnicodeRange3,
        ulUnicodeRange4: ulUnicodeRange4,
        // See http://typophile.com/node/13081 for more info on vertical metrics.
        // We get metrics for typical characters (such as "x" for xHeight).
        // We provide some fallback characters if characters are unavailable: their
        // ordering was chosen experimentally.
        sTypoAscender: globals.ascender,
        sTypoDescender: globals.descender,
        sTypoLineGap: 0,
        usWinAscent: globals.ascender,
        usWinDescent: -globals.descender,
        sxHeight: metricsForChar(font, 'xyvw', {yMax: 0}).yMax,
        sCapHeight: metricsForChar(font, 'HIKLEFJMNTZBDPRAGOQSUVWXY', globals).yMax,
        usBreakChar: font.hasChar(' ') ? 32 : 0 // Use space as the break character, if available.
    });

    var hmtxTable = hmtx.make(font.glyphs);
    var cmapTable = cmap.make(font.glyphs);

    var fullName = font.familyName + ' ' + font.styleName;
    var postScriptName = font.familyName.replace(/\s/g, '') + '-' + font.styleName;
    var nameTable = _name.make({
        copyright: font.copyright,
        fontFamily: font.familyName,
        fontSubfamily: font.styleName,
        uniqueID: font.manufacturer + ':' + fullName,
        fullName: fullName,
        version: font.version,
        postScriptName: postScriptName,
        trademark: font.trademark,
        manufacturer: font.manufacturer,
        designer: font.designer,
        description: font.description,
        manufacturerURL: font.manufacturerURL,
        designerURL: font.designerURL,
        license: font.license,
        licenseURL: font.licenseURL,
        preferredFamily: font.familyName,
        preferredSubfamily: font.styleName
    });
    var postTable = post.make();
    var cffTable = cff.make(font.glyphs, {
        version: font.version,
        fullName: fullName,
        familyName: font.familyName,
        weightName: font.styleName,
        postScriptName: postScriptName,
        unitsPerEm: font.unitsPerEm
    });
    // Order the tables according to the the OpenType specification 1.4.
    var tables = [headTable, hheaTable, maxpTable, os2Table, nameTable, cmapTable, postTable, cffTable, hmtxTable];

    var sfntTable = makeSfntTable(tables);

    // Compute the font's checkSum and store it in head.checkSumAdjustment.
    var bytes = sfntTable.encode();
    var checkSum = computeCheckSum(bytes);
    var tableFields = sfntTable.fields;
    var checkSumAdjusted = false;
    for (i = 0; i < tableFields.length; i += 1) {
        if (tableFields[i].name === 'head table') {
            tableFields[i].value.checkSumAdjustment = 0xB1B0AFBA - checkSum;
            checkSumAdjusted = true;
            break;
        }
    }

    if (!checkSumAdjusted) {
        throw new Error('Could not find head table with checkSum to adjust.');
    }

    return sfntTable;
}