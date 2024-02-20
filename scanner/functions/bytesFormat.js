function bytesFormat(bytes) {
    if (bytes < 2000) return `${bytes} B`;
    if (bytes < 2000000) return `${Math.round(bytes / 100) / 10} kB`;
    if (bytes < 2000000000) return `${Math.round(bytes / 100000) / 10} MB`;
    return `${Math.round(bytes / 1000000)} MB`;
}