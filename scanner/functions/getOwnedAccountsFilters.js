function getOwnedAccountsFilters(publicKey) {
  return [
    {
      memcmp: {
        offset: ACCOUNT_LAYOUT.offsetOf('owner'),
        bytes: publicKey.toBase58(),
      },
    },
    {
      dataSize: ACCOUNT_LAYOUT.span,
    },
  ];
}