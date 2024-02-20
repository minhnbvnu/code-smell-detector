function headersReceivedListener(details) {
  return forward.onHeadersReceivedCallback(details, corsEnabled);
}