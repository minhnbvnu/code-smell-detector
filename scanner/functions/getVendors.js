function getVendors(agent, callback) {
  let done = 0
  let vendors = null
  VENDOR_NAMES.forEach(function getVendorInfo(vendor) {
    VENDOR_METHODS[vendor](agent, function getInfo(err, result) {
      logger.trace('Vendor %s finished.', vendor)
      if (result) {
        vendors = vendors || Object.create(null)
        vendors[vendor] = result
      }

      if (++done === VENDOR_NAMES.length) {
        callback(null, vendors)
      }
    })
  })
}