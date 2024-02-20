function getFileForQuery(query) {
    let firstLetter = query[0].toLocaleLowerCase();
    let results = downloaded.get(firstLetter);
    if (results) return Promise.resolve([]);

    return downloadAndIndexFile(firstLetter).then(() => {
        let sims = indexed.get(query.toLocaleLowerCase())
        return sims || [];
      })
  }