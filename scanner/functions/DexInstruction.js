function DexInstruction({ instruction, onOpenAddress }) {
  const wallet = useWallet();
  const [publicKeys] = useWalletPublicKeys();
  const { type, data, market, marketInfo } = instruction;

  const marketLabel =
    (marketInfo &&
      marketInfo?.name + (marketInfo?.deprecated ? ' (deprecated)' : '')) ||
    market?._decoded?.ownAddress?.toBase58() ||
    'Unknown';

  const getAddressValue = (address) => {
    const isOwned = publicKeys.some((ownedKey) => ownedKey.equals(address));
    const isOwner = wallet.publicKey.equals(address);
    return isOwner
      ? 'This wallet'
      : (isOwned ? '(Owned) ' : '') + address?.toBase58();
  };

  return (
    <>
      <Typography
        variant="subtitle1"
        style={{ fontWeight: 'bold' }}
        gutterBottom
      >
        {TYPE_LABELS[type]}
      </Typography>
      <LabelValue
        label="Market"
        value={marketLabel}
        link={true}
        onClick={() =>
          onOpenAddress(
            (marketInfo?.address || market?._decoded?.ownAddress)?.toBase58(),
          )
        }
      />
      {data &&
        Object.entries(data).map(([key, value]) => {
          const dataLabel = DATA_LABELS[key];
          if (!dataLabel) {
            return null;
          }
          const { label, address } = dataLabel;
          return (
            <LabelValue
              key={key}
              label={label + ''}
              value={address ? getAddressValue(value) : value + ''}
              link={address}
              onClick={() => address && onOpenAddress(value?.toBase58())}
            />
          );
        })}
    </>
  );
}