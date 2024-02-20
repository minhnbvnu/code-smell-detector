async function installZippedFile(from, to) {
    const stream = await getDownloadStream(from);

    await writeDownloadStream(stream, to);
    return uncompressDownloadedFile(to);
  }