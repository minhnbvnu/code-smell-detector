function checkVersion(connection) {
  var server_version = connection._options.version.toLowerCase();

  return (server_version == 'auto' || server_version == connection.version);
}