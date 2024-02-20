function normalizeClient(client) {
  if (client === undefined) return client;
  const version = identifyClientVersion(client);
  switch (version) {
    case DocumentClientVersions.v3:
      return DocumentClientV3Wrapper.init(client);
    case DocumentClientVersions.v2:
      return DocumentClientV2Wrapper.init(client);
    case DocumentClientVersions.electro:
      return client;
    default:
      throw new ElectroError(
        ErrorCodes.InvalidClientProvided,
        "Invalid DynamoDB Document Client provided. ElectroDB supports the v2 and v3 DynamoDB Document Clients from the aws-sdk",
      );
  }
}