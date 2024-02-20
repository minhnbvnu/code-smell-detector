function canonicalizeLicense(license) {
        // Remove space after copyright and always just use the symbol
        license = license.replace(/(?:\(c\)|copyright|©)\s*(?=\d)/gi, '©');
        
        // Lower-case any leading "by"
        license = license.replace(/^By /, 'by ');
        return license;
    }