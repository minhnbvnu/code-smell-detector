function oldestVersion(versions) {
  const sortedVersions = (versions || []).sort((a, b) => compare(a, b));
  return sortedVersions.length > 0 ? minMatchingVersion(sortedVersions[0]) : undefined;
}