function isMobileDeviceRequestingDesktopSite () {
  return !isMobile() && !isMobileVR() && window.orientation !== undefined;
}