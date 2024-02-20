function createDataClient(endpoint) {
  const fileNames = getFileNames();
  const downloaded = new Map();
  const indexed = new Map();
  const list = [];
  let prepared = [];

  let sizeCount = 1;
  let sizes = new Map();
  fetch(endpoint + 'count.json', {responseType: 'json'})
    .then(rows => {
      rows.forEach((row, index) => {
        row.forEach(subreddit => {
          sizes.set(subreddit, index + 2);
        })
      });

      sizeCount = rows.length + 2;
    })

  return {
    getRelated,
    getSuggestion,
    getSize
  }

  function getSize(subName) {
    let size = sizes.get(subName);
    return (size || 1)/sizeCount;
  }

  function getSuggestion(query) {
    let firstLetter = query[0].toLocaleLowerCase();
    let results = downloaded.get(firstLetter);
    if (results) {
      results = fuzzysort.go(query, prepared, {limit: 10})
      return Promise.resolve(results.map(x => ({
        html: fuzzysort.highlight(x, '<b>', '</b>'),
        text: x.target
      })));
    } else {
      return downloadAndIndexFile(firstLetter).then(() => {
        return getSuggestion(query);
      })
    }
  }

  function getRelated(query) {
    let sims = indexed.get(query.toLocaleLowerCase());
    if (sims) return Promise.resolve(sims);

    return getFileForQuery(query);
  }

  function downloadAndIndexFile(firstLetter) {
    let url = endpoint + fileNames.get(firstLetter);
    console.log('download ', firstLetter);
    return fetch(url, {responseType: 'json'})
      .then(response => {
        downloaded.set(firstLetter, response);
        response.forEach(row => {
          let keyName = row[0].toLocaleLowerCase();
          if (indexed.get(keyName)) return;

          list.push(row[0]);
          indexed.set(keyName, row);
        });
        prepared = list.map(l => fuzzysort.prepare(l));
      })
  }

  function getFileForQuery(query) {
    let firstLetter = query[0].toLocaleLowerCase();
    let results = downloaded.get(firstLetter);
    if (results) return Promise.resolve([]);

    return downloadAndIndexFile(firstLetter).then(() => {
        let sims = indexed.get(query.toLocaleLowerCase())
        return sims || [];
      })
  }

}