function OperatingSystem(family, major, minor, patch) {
  this.family = family || 'Other';
  this.major = major || '0';
  this.minor = minor || '0';
  this.patch = patch || '0';
}