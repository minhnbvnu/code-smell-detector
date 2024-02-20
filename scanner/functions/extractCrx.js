function extractCrx(crxPath) {
  if (!crxPath)
    return null;
  var unpackedPath = crxPath + '-unpacked';
  if (fs.existsSync(unpackedPath)) {
    return {
      manifest: JSON.parse(fs.readFileSync(path.join(unpackedPath, 'manifest.json'))),
      path: unpackedPath,
    };
  }

  console.log('extracting', crxPath);
  var b = fs.readFileSync(crxPath);
  var arrayBuffer = new Uint8Array(b).buffer;
  var ui32 = new DataView(arrayBuffer);
  // maybe this is a zip. check the zip magic.
  if (ui32.getInt32(0, true) != 0x04034b50) {
    var pklen = ui32.getInt32(8, true);
    var siglen = ui32.getInt32(12, true);

    var offset = 4 * 4 + pklen + siglen;
    console.log(offset);
    b = Buffer.from(arrayBuffer, offset);
  }
  var zip = new AdmZip(b);

  var tmp = unpackedPath + '.tmp';
  deleteRecursive(unpackedPath);
  deleteRecursive(tmp);
  zip.extractAllTo(tmp, true);
  fs.renameSync(tmp, unpackedPath);

  console.log('extracted', unpackedPath);
  return {
    manifest: JSON.parse(fs.readFileSync(path.join(unpackedPath, 'manifest.json'))),
    path: unpackedPath,
  }
}