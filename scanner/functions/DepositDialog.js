function DepositDialog({
  open,
  onClose,
  publicKey,
  balanceInfo,
  swapInfo,
  isAssociatedToken,
}) {
  const ethAccount = useEthAccount();
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const { mint, tokenName, tokenSymbol, owner } = balanceInfo;
  const [tab, setTab] = useState(0);

  // SwapInfos to ignore.
  if (
    swapInfo &&
    swapInfo.coin &&
    swapInfo.coin.erc20Contract === '0x2b2e04bf86978b45bb2edf54aca876973bdd43c0'
  ) {
    swapInfo = null;
  }

  let tabs = null;
  if (swapInfo) {
    let firstTab = `SPL ${tokenSymbol ?? swapInfo.coin.ticker}`;
    let secondTab = swapInfo.coin.ticker;
    if (!mint) {
      firstTab = 'SOL';
    } else {
      if (
        localStorage.getItem('sollet-private') ||
        swapInfo.blockchain !== 'eth'
      ) {
        secondTab = `${
          swapInfo.coin.erc20Contract ? 'ERC20' : 'Native'
        } ${secondTab}`;
      } else {
        secondTab = null;
      }
    }
    tabs = (
      <Tabs
        value={tab}
        variant="fullWidth"
        onChange={(e, value) => setTab(value)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label={firstTab} />
        {(!DISABLED_MINTS.has(mint && mint.toString()) ||
          localStorage.getItem('sollet-private')) &&
          secondTab && <Tab label={secondTab} />}
      </Tabs>
    );
  }
  const displaySolAddress = publicKey.equals(owner) || isAssociatedToken;
  const depositAddressStr = displaySolAddress
    ? owner.toBase58()
    : publicKey.toBase58();
  return (
    <DialogForm open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Deposit {tokenName ?? mint.toBase58()}
        {tokenSymbol ? ` (${tokenSymbol})` : null}
        {ethAccount && (
          <div>
            <Typography color="textSecondary" style={{ fontSize: '14px' }}>
              Metamask connected: {ethAccount}
            </Typography>
          </div>
        )}
      </DialogTitle>
      {tabs === null ? (
        <Tabs
          value={tab}
          variant="fullWidth"
          onChange={(e, value) => setTab(value)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label={mint ? 'SPL' : 'SOL'} />
          <Tab label="Wormhole" />
        </Tabs>
      ) : (
        tabs
      )}
      <DialogContent style={{ paddingTop: 16 }}>
        {tab === 0 ? (
          <>
            {!displaySolAddress && isAssociatedToken === false ? (
              <DialogContentText>
                This address can only be used to receive{' '}
                {tokenSymbol ?? abbreviateAddress(mint)}. Do not send SOL to
                this address.
                <br />
                <b style={{ color: 'red' }}>WARNING</b>: You are using a
                deprecated account type. Please migrate your tokens. Ideally,
                create a new wallet. If you send to this address from a poorly
                implemented wallet, you may burn tokens.
              </DialogContentText>
            ) : (
              <DialogContentText>
                This address can be used to receive{' '}
                {tokenSymbol ?? abbreviateAddress(mint)}.
              </DialogContentText>
            )}
            <CopyableDisplay
              value={depositAddressStr}
              label={'Deposit Address'}
              autoFocus
              qrCode
            />
            <DialogContentText variant="body2">
              <Link
                href={
                  `https://solscan.io/account/${depositAddressStr}` + urlSuffix
                }
                target="_blank"
                rel="noopener"
              >
                View on Solscan
              </Link>
            </DialogContentText>
          </>
        ) : tab === 1 ? (
          <DialogContentText>
            Please use the{' '}
            <a
              href="https://www.portalbridge.com/#/transfer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white' }}
            >
              Wormhole Portal Bridge
            </a>{' '}
            to bridge your assets.
          </DialogContentText>
        ) : (
          <SolletSwapDepositAddress
            balanceInfo={balanceInfo}
            swapInfo={swapInfo}
            ethAccount={ethAccount}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </DialogForm>
  );
}