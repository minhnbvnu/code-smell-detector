function isMissingBlockLineCommentLicense(licenseText) {
  return !BLOCK_REGEX.test(licenseText);
}