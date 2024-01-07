function checkDeprecatedPackagesMetadata() {
  for (let packageName of Object.keys(deprecatedPackagesMetadata)) {
    const packageMetadata = deprecatedPackagesMetadata[packageName];
    if (
      packageMetadata.version &&
      !semver.validRange(packageMetadata.version)
    ) {
      throw new Error(
        `Invalid range: ${packageMetadata.version} (${packageName}).`
      );
    }
  }
}