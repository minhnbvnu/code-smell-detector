function TokenInfoDialog({
  open,
  onClose,
  publicKey,
  balanceInfo,
}) {
  let { mint, tokenName, tokenSymbol } = balanceInfo;
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const classes = useStyles();

  return (
    <DialogForm open={open} onClose={onClose}>
      <DialogTitle>
        {tokenName ?? abbreviateAddress(mint)}
        {tokenSymbol ? ` (${tokenSymbol})` : null}
      </DialogTitle>
      <DialogContent className={classes.container}>
        <Typography className={classes.warning}>
          Information about {tokenName ?? abbreviateAddress(mint)}
        </Typography>
        <Typography variant="body2" className={classes.explorerLink}>
          <Link
            href={
              `https://solscan.io/account/${publicKey.toBase58()}`
              + urlSuffix
            }
            target="_blank"
            rel="noopener"
          >
            View on Solscan
          </Link>
        </Typography>
        {!!mint && (
          <CopyableDisplay
            value={mint.toBase58()}
            label={'Token Mint Address'}
            autoFocus
            helperText={
              <>
                This is <strong>not</strong> your deposit address
              </>
            }
          />
        )}
        {!!tokenName && (
          <CopyableDisplay value={tokenName} label={'Token Name'} />
        )}
        {!!tokenSymbol && (
          <CopyableDisplay value={tokenSymbol} label={'Token Symbol'} />
        )}
      </DialogContent>
    </DialogForm>
  );
}