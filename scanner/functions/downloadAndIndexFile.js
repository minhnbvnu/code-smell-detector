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