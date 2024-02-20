function createTables(prefix, maxValue, canonicalGroups)
{
    var prefixLower = prefix.toLowerCase();
    var prefixUpper = prefix.toUpperCase();
    var typeInfo = [];
    var characterSetInfo = [];
    // Pass 2: populate typeInfo & characterSetInfo. For every character calculate
    // a typeInfo value, described by the types above, and a value payload.
    for (cu in canonicalGroups) {
        // The set of characters that canonicalize to cu
        var characters = canonicalGroups[cu];

        // If there is only one, it is unique.
        if (characters.length == 1) {
            typeInfo[characters[0]] = "CanonicalizeUnique:0";
            continue;
        }

        // Sort the array.
        characters.sort(function(x,y){return x-y;});

        // If there are more than two characters, create an entry in characterSetInfo.
        if (characters.length > 2) {
            for (i in characters)
                typeInfo[characters[i]] = "CanonicalizeSet:" + characterSetInfo.length;
            characterSetInfo.push(characters);

            continue;
        }

        // We have a pair, mark alternating ranges, otherwise track whether this is the low or high partner.
        var lo = characters[0];
        var hi = characters[1];
        var delta = hi - lo;
        if (delta == 1) {
            var type = lo & 1 ? "CanonicalizeAlternatingUnaligned:0" : "CanonicalizeAlternatingAligned:0";
            typeInfo[lo] = type;
            typeInfo[hi] = type;
        } else {
            typeInfo[lo] = "CanonicalizeRangeLo:" + delta;
            typeInfo[hi] = "CanonicalizeRangeHi:" + delta;
        }
    }

    var rangeInfo = [];
    // Pass 3: coallesce types into ranges.
    for (var end = 0; end <= maxValue; ++end) {
        var begin = end;
        var type = typeInfo[end];
        while (end < maxValue && typeInfo[end + 1] == type)
            ++end;
        rangeInfo.push({begin:begin, end:end, type:type});
    }

    for (i in characterSetInfo) {
        var characters = ""
        var set = characterSetInfo[i];
        for (var j in set)
            characters += hex(set[j]) + ", ";
        print("const UChar32 " + prefixLower + "CharacterSet" + i + "[] = { " + characters + "0 };");
    }
    print();
    print("static const size_t " + prefixUpper + "_CANONICALIZATION_SETS = " + characterSetInfo.length + ";");
    print("const UChar32* const " + prefixLower + "CharacterSetInfo[" + prefixUpper + "_CANONICALIZATION_SETS] = {");
    for (i in characterSetInfo)
    print("    " + prefixLower + "CharacterSet" + i + ",");
    print("};");
    print();
    print("const size_t " + prefixUpper + "_CANONICALIZATION_RANGES = " + rangeInfo.length + ";");
    print("const CanonicalizationRange " + prefixLower + "RangeInfo[" + prefixUpper + "_CANONICALIZATION_RANGES] = {");
    for (i in rangeInfo) {
        var info = rangeInfo[i];
        var typeAndValue = info.type.split(':');
        print("    { " + hex(info.begin) + ", " + hex(info.end) + ", " + hex(typeAndValue[1]) + ", " + typeAndValue[0] + " },");
    }
    print("};");
    print();
}