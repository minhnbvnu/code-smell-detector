function getFbGatekeepers() {
  if (fbGatekeepersLoaded) {
    return fbGatekeepers;
  }

  try {
    // $FlowFB
    fbGatekeepers = require('../fb-gatekeeper-raw/fb-gatekeeper-list.js'); // eslint-disable-line nuclide-internal/modules-dependencies
  } catch (_) {}

  fbGatekeepersLoaded = true;
  return fbGatekeepers;
}