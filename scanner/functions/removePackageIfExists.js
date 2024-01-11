async function removePackageIfExists({
    version,
    type,
    arch,
    fileName,
    distroName,
    distroVersion,
    releaseSuffix
  }) {
    // RPM URI paths have an extra '/0.1' thrown in
    let versionJsonPath =
      type === 'rpm' ? `${version.replace('-', '.')}/0.1` : version;

    try {
      const existingPackageDetails = await request({
        uri: `https://${apiToken}:@packagecloud.io/api/v1/repos/AtomEditor/${packageRepoName}/package/${type}/${distroName}/${distroVersion}/atom${releaseSuffix ||
          ''}/${arch}/${versionJsonPath}.json`,
        method: 'get',
        json: true
      });

      if (existingPackageDetails && existingPackageDetails.destroy_url) {
        console.log(
          `Deleting pre-existing package ${fileName} in ${packageRepoName}`
        );
        await request({
          uri: `https://${apiToken}:@packagecloud.io/${
            existingPackageDetails.destroy_url
          }`,
          method: 'delete'
        });
      }
    } catch (err) {
      if (err.statusCode !== 404) {
        console.log(
          `Error while checking for existing '${fileName}' v${version}:\n\n`,
          err
        );
      }
    }
  }