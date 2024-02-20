function unsubscribeSetup() {
  TransportNodeHidSingleton.disconnect();
  // TODO to be done on the transport side as part of listen() unsubscribe
  usbDetect.stopMonitoring();
}