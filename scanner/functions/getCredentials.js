async function getCredentials(lndSettingsDir) {
  let certPath = path.join(lndSettingsDir, 'tls.cert');
  await waitForCertPath(certPath);
  const lndCert = fs.readFileSync(certPath);
  return grpc.credentials.createSsl(lndCert);
}