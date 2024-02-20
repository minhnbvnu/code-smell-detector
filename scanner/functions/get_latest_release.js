async function get_latest_release(outFile) {
  let response = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
    owner: 'kewisch',
    repo: 'ical.js'
  });

  let release = response.data.name;

  let icaljsAsset = response.data.assets.find(asset => asset.name == "ical.js");
  if (!icaljsAsset) {
    console.error("ical.js asset missing from " + release);
  }
  response = await fetch(icaljsAsset.browser_download_url);

  let icaljs = await response.text();

  await fs.writeFile(outFile, icaljs);
  console.log("Latest release written to " + outFile);
}