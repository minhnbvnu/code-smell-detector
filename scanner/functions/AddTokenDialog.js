function AddTokenDialog({ open, onClose }) {
  let wallet = useWallet();
  let [tokenAccountCost] = useAsyncData(
    wallet.tokenAccountCost,
    wallet.tokenAccountCost,
  );
  let classes = useStyles();
  let updateTokenName = useUpdateTokenName();
  const [sendTransaction, sending] = useSendTransaction();

  const [walletAccounts] = useWalletTokenAccounts();
  const popularTokens = usePopularTokens();
  const [tab, setTab] = useState(!!popularTokens ? 'popular' : 'manual');
  const [mintAddress, setMintAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [erc20Address, setErc20Address] = useState('');

  useEffect(() => {
    if (!popularTokens) {
      setTab('manual');
    }
  }, [popularTokens]);

  function onSubmit(params) {
    if (tab === 'manual') {
      params = { mintAddress, tokenName, tokenSymbol };
    } else if (tab === 'erc20') {
      params = { erc20Address };
    }
    sendTransaction(addToken(params), {
      onSuccess: () => {
        refreshWalletPublicKeys(wallet);
        onClose();
      },
    });
  }

  async function addToken({
    mintAddress,
    tokenName,
    tokenSymbol,
    erc20Address,
  }) {
    if (erc20Address) {
      let tokenInfo = await swapApiRequest('POST', `coins/eth/${erc20Address}`);
      mintAddress = tokenInfo.splMint;
      tokenName = tokenInfo.name;
      tokenSymbol = tokenInfo.ticker;
      if (tokenInfo.blockchain !== 'sol') {
        tokenName = 'Wrapped ' + tokenName;
      }
    }

    let mint = new PublicKey(mintAddress);
    updateTokenName(mint, tokenName, tokenSymbol);
    const resp = await wallet.createAssociatedTokenAccount(mint);
    return resp[1];
  }

  let valid = true;
  if (tab === 'erc20') {
    valid = erc20Address.length === 42 && erc20Address.startsWith('0x');
  }

  return (
    <DialogForm open={open} onClose={onClose}>
      <DialogTitle>Add Token</DialogTitle>
      <DialogContent>
        {tokenAccountCost ? (
          <DialogContentText>
            Add a token to your wallet. This will cost{' '}
            {feeFormat.format(tokenAccountCost / LAMPORTS_PER_SOL)} SOL.
          </DialogContentText>
        ) : (
          <LoadingIndicator />
        )}
        {!!popularTokens && (
          <Tabs
            value={tab}
            textColor="primary"
            indicatorColor="primary"
            className={classes.tabs}
            onChange={(e, value) => setTab(value)}
          >
            <Tab label="Popular Tokens" value="popular" />
            {showSwapAddress ? <Tab label="ERC20 Token" value="erc20" /> : null}
            <Tab label="Manual Input" value="manual" />
          </Tabs>
        )}
        {tab === 'manual' || !popularTokens ? (
          <React.Fragment>
            <TextField
              label="Token Mint Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              autoFocus
              disabled={sending}
            />
            <TextField
              label="Token Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              disabled={sending}
            />
            <TextField
              label="Token Symbol"
              fullWidth
              variant="outlined"
              margin="normal"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              disabled={sending}
            />
          </React.Fragment>
        ) : tab === 'popular' ? (
          <List disablePadding>
            {popularTokens.filter(tokenInfo => tokenInfo.address).map((tokenInfo) => (
              <TokenListItem
                key={tokenInfo.address}
                tokenInfo={tokenInfo}
                existingAccount={(walletAccounts || []).find(
                  (account) =>
                    account.parsed.mint.toBase58() === tokenInfo.address,
                )}
                onSubmit={onSubmit}
                disabled={sending}
              />
            ))}
          </List>
        ) : tab === 'erc20' ? (
          <>
            <TextField
              label="ERC20 Contract Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={erc20Address}
              onChange={(e) => setErc20Address(e.target.value.trim())}
              autoFocus
              disabled={sending}
            />
            {erc20Address && valid ? (
              <Link
                href={`https://etherscan.io/token/${erc20Address}`}
                target="_blank"
                rel="noopener"
              >
                View on Etherscan
              </Link>
            ) : null}
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {tab !== 'popular' && (
          <Button
            type="submit"
            color="primary"
            disabled={sending || !valid}
            onClick={() => onSubmit({ tokenName, tokenSymbol, mintAddress })}
          >
            Add
          </Button>
        )}
      </DialogActions>
    </DialogForm>
  );
}