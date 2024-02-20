async function installGzippedFile(from, to) {
    const stream = await getDownloadStream(from);

    await writeDownloadStream(stream, to);
    return uncompressGzippedFile(from, to);
  }