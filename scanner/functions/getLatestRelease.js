async function getLatestRelease() {
  const client = new Octokit();

  let latest = '0.0.0';
  await client.paginate(
    client.rest.repos.listReleases,
    {
      owner: 'openlayers',
      repo: 'openlayers',
    },
    (response) => {
      for (const release of response.data) {
        const version = semver.valid(release.name);
        if (version && semver.gt(version, latest)) {
          latest = version;
        }
      }
    },
  );

  return latest;
}