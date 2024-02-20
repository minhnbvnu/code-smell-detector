function registerProtocolHandler(protocol, protocolFetchImpl) {
  protocols[protocol] = protocolFetchImpl;
}