async function uploadAsset(client, release, assetPath, label) {
  const name = basename(assetPath);
  const stats = await stat(assetPath);
  const data = await readFile(assetPath);

  await client.rest.repos.uploadReleaseAsset({
    url: release.upload_url,
    name,
    label,
    headers: {
      'content-type': 'application/zip',
      'content-length': stats.size,
    },
    data,
  });
}