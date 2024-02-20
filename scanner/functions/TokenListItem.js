function TokenListItem({ tokenInfo, onSubmit, disabled, existingAccount }) {
  const [open, setOpen] = useState(false);
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const alreadyExists = !!existingAccount;

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }} key={tokenInfo.name}>
        <ListItem button onClick={() => setOpen((open) => !open)}>
          <ListItemIcon>
            <TokenIcon
              url={tokenInfo.logoUri}
              tokenName={tokenInfo.name}
              size={20}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Link
                target="_blank"
                rel="noopener"
                href={
                  `https://solscan.io/account/${tokenInfo.address}` +
                  urlSuffix
                }
              >
                {tokenInfo.name ?? abbreviateAddress(tokenInfo.address)}
                {tokenInfo.symbol ? ` (${tokenInfo.symbol})` : null}
              </Link>
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Button
          type="submit"
          color="primary"
          disabled={disabled || alreadyExists}
          onClick={() =>
            onSubmit({
              tokenName: tokenInfo.name,
              tokenSymbol: tokenInfo.symbol,
              mintAddress: tokenInfo.address,
            })
          }
        >
          {alreadyExists ? 'Added' : 'Add'}
        </Button>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CopyableDisplay
          value={tokenInfo.address}
          label={`${tokenInfo.symbol} Mint Address`}
        />
      </Collapse>
    </React.Fragment>
  );
}