async function uploadDebPackage(version, filePath) {
    // NOTE: Not sure if distro IDs update over time, might need
    // to query the following endpoint dynamically to find the right IDs:
    //
    // https://{apiToken}:@packagecloud.io/api/v1/distributions.json
    await uploadPackage({
      version,
      filePath,
      type: 'deb',
      arch: 'amd64',
      fileName: 'atom-amd64.deb',
      distroId: 35 /* Any .deb distribution */,
      distroName: 'any',
      distroVersion: 'any'
    });
  }