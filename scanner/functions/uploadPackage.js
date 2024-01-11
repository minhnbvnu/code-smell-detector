async function uploadPackage(packageDetails) {
    // Infer the package suffix from the version
    if (/-beta\d+/.test(packageDetails.version)) {
      packageDetails.releaseSuffix = '-beta';
    } else if (/-nightly\d+/.test(packageDetails.version)) {
      packageDetails.releaseSuffix = '-nightly';
    }

    await removePackageIfExists(packageDetails);
    await uploadToPackageCloud(packageDetails);
  }