function addr2str(address) {
  var str;
  if ('address' in address) {
    str = fmt('%s:%d', address.address || '0.0.0.0', address.port);
  } else {
    str = fmt('unix:%s', address);
  }
  return str;
}