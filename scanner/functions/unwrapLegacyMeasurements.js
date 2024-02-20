function unwrapLegacyMeasurements(measurements) {
  return measurements && measurements.__unstable_this_format_will_change || measurements;
}