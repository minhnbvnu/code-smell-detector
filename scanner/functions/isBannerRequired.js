function isBannerRequired() {
  return !(ADBLOCK || CI || DISABLE_OPENCOLLECTIVE || SILENT || OPEN_SOURCE_CONTRIBUTOR);
}