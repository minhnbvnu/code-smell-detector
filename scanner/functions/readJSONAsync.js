async function readJSONAsync(file) {
    const gunzipAsync = promisify(zlib.gunzip);
    const brotliDecompressAsync = promisify(zlib.brotliDecompress);

    let data = await fsAsync.readFile(file);
    if (file.endsWith(".gz")) data = await gunzipAsync(data);
    if (file.endsWith(".br")) data = await brotliDecompressAsync(data);
    return JSON.parse(data);
}