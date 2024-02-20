function writeJSON(file, data, fileCompressor = false, spacer = 2, compressData = false) {
    if (compressData) data = compress(data);
    data = JSON.stringify(data, null, spacer);
    if (fileCompressor == "gz") data = zlib.gzipSync(data);
    if (fileCompressor == "br") data = zlib.brotliCompressSync(data, BROTLI_OPTIONS);
    fs.writeFileSync(`${file}${fileCompressor ? "." + fileCompressor : ""}`, data);
}