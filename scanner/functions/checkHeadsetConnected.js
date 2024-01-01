function checkHeadsetConnected () {
  return supportsVRSession || supportsARSession || !!getVRDisplay();
}