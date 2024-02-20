function $postGlyphSpace(chrPair, font) {
    if (font.spacing.x !== 0 || chrPair.length === 1) {
        return font.spacing.x;
    } else {
        const symbolRegex = /[^A-Za-z0-9_αβγδεζηθικλμνξ§πρστυϕχψωςşğÆÀÁÂÃÄÅÇÈÉÊËÌÍÎÏØÒÓÔÕÖŒÑẞÙÚÛÜБДæàáâãäåçèéêëìíîïøòóôõöœñßùúûüбгдЖЗИЙЛПЦЧШЩЭЮЯЪЫЬжзийлпцчшщэюяъыьΓΔмнкΘΛΞΠİΣℵΦΨΩŞĞ]/;
        // test() will not fail on undefined or NaN, so ok to not safeguard the string conversions
        return symbolRegex.test(chrPair) ? 1 : 0;
    }
}