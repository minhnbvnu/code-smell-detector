function unprotectObjectSpread(src) {
    return src.replace(/'⏓':/g, '...');
}