function FtxPayDialog({ open, onClose }) {
  const { accounts } = useWalletSelector();
  const classes = useStyles();
  const popularTokens = usePopularTokens();
  const selectedAccount = accounts.find((a) => a.isSelected);
  const [coin, setCoin] = useState('SOL');
  const address = selectedAccount?.address?.toBase58();
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const isExtensionWidth = useIsExtensionWidth();

  const onSubmit = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('address', address);
    urlSearchParams.append('coin', coin);
    urlSearchParams.append('wallet', 'sol');
    urlSearchParams.append('memoIsRequired', false);
    window.open(
      `https://ftx.com/pay/request?${urlSearchParams}`,
      '_blank',
      'resizable,width=450,height=780',
    );
  };

  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        Deposit funds with{' '}
        <Link target="_blank" href={'https://ftx.com/pay'}>
          FTX Pay
        </Link>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Send funds to your Sollet wallet from an FTX account, where you can add funds using crypto on multiple blockchains, credit cards, and more.
        </DialogContentText>
        <DialogContentText>
          If you don't have an FTX account, it may take a few moments to get up.
        </DialogContentText>
        <div className={classes.container}>
          <FormControl variant="outlined" className={classes.selector}>
            <Select value={coin} onChange={(e) => setCoin(e.target.value)}>
              <MenuItem value={'SOL'}>
                <div className={classes.menuItem}>
                  <TokenIcon
                    url={null}
                    mint={null}
                    tokenName={'SOL'}
                    size={30}
                    className={classes.tokenIcon}
                  />
                  <div>{isExtensionWidth ? 'SOL' : 'Solana SOL'}</div>
                </div>
              </MenuItem>
              {popularTokens
                .filter((tokenInfo) => tokenInfo.address && tokenInfo.symbol)
                .map((tokenInfo) => (
                  <MenuItem value={tokenInfo.symbol} key={tokenInfo.symbol}>
                    <div className={classes.menuItem}>
                      <TokenIcon
                        url={tokenInfo.logoUri}
                        tokenName={tokenInfo.name}
                        size={30}
                        className={classes.tokenIcon}
                      />
                      <Link
                        target="_blank"
                        rel="noopener"
                        href={
                          `https://solscan.io/account/${tokenInfo.address}` +
                          urlSuffix
                        }
                      >
                        {(isExtensionWidth ? '' : `${tokenInfo.name ?? abbreviateAddress(tokenInfo.address)} `) + tokenInfo.symbol}
                      </Link>
                    </div>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button onClick={onSubmit} size="large" color="primary">
            Open FTX Pay
          </Button>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </DialogForm>
  );
}