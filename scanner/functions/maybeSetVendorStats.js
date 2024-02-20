function maybeSetVendorStats(vendorStats, systemInfo) {
  if (vendorStats) {
    systemInfo.vendors = vendorStats
  }
}