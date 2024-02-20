async function downloadPane(paneFolder, dist) {
  console.log(`Downloading ${paneFolder}`);

  let response = await got(
    `https://github.com/emberjs/ember-inspector/blob/panes/${paneFolder}/${dist}.zip?raw=true`,
    {
      responseType: 'buffer',
    }
  );

  await unzip(response.body, `dist_prev/production/${dist}/${paneFolder}`);
}