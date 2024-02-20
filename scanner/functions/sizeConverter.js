function sizeConverter(size) {
    let totalSize = 0;
    totalSize = Number(size / (1024 * 1024)).toFixed(2) + "/" + (Number(TOTALSIZE / (1024 * 1024))).toFixed(2) + "MB";
    return totalSize;
}