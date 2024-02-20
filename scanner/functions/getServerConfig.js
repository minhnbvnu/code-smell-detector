function getServerConfig() {
  const host = "0.0.0.0";
  const port = process.env.PORT || 8080;

  return { host, port };
}