async function getExchangeRateCached() {
    const now = new Date();
    const cache = `/tmp/data-${now.getFullYear()}-${now.getMonth()}-${now.getDay()}.json`;
    if (fs.existsSync(cache)) {
      return JSON.parse(fs.readFileSync(cache, { encoding: 'utf-8' }));
    }

    const data = await getExchangeRate();
    fs.writeFileSync(cache, JSON.stringify(data), { encoding: 'utf-8' });

    return data;
  }