async function uploadRpmPackage(version, filePath) {
    await uploadPackage({
      version,
      filePath,
      type: 'rpm',
      arch: 'x86_64',
      fileName: 'atom.x86_64.rpm',
      distroId: 140 /* Enterprise Linux 7 */,
      distroName: 'el',
      distroVersion: '7'
    });
  }