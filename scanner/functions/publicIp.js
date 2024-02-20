function publicIp(server) {
  if (/direct/.test(server.getDriverInfo().type)) {
    return '127.0.0.1';
  }
  return _(os.networkInterfaces())
          .omit(['docker0', 'docker1', 'docker2'])
          .values()
          .flatten()
          .where({family: 'IPv4', internal: false})
          .pluck('address')
          .first()
          || '127.0.0.1';
}