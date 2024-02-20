async function installSingleFile(from, to) {
    const stream = await getDownloadStream(from);

    return writeDownloadStream(stream, to);
  }