function isFileOfExtension(fname, ext) {
        var invariantFname = fname.toLocaleUpperCase();
        var invariantExt = ext.toLocaleUpperCase();
        var extLength = invariantExt.length;
        return invariantFname.length > extLength && invariantFname.substring(invariantFname.length - extLength, invariantFname.length) == invariantExt;
    }