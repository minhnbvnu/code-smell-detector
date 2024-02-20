async function getLatestChromeVersion(possibleChanel) {
  const response = await axios({
    method: 'get',
    url: 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions.json',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const channel = Object.keys(response.data.channels).find((i) => i.toLowerCase() === possibleChanel.toLowerCase());

  try {
    return response.data.channels[channel].version;
  } catch (err) {
    console.log();
    throw new Error(`channel can't be - ${possibleChanel}, possible only Stable, Beta, Dev, Canary`);
  }
}