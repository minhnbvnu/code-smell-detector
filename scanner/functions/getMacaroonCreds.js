function getMacaroonCreds(lndSettingsDir, network) {
  return grpc.credentials.createFromMetadataGenerator((args, callback) => {
    const metadata = new grpc.Metadata();
    const macaroonPath = path.join(
      lndSettingsDir,
      `data/chain/bitcoin/${network}/admin.macaroon`
    );
    const macaroonHex = fs.readFileSync(macaroonPath).toString('hex');
    metadata.add('macaroon', macaroonHex);
    callback(null, metadata);
  });
}