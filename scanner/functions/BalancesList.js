function BalancesList() {
  const wallet = useWallet();
  const [publicKeys, loaded] = useWalletPublicKeys();
  const [showAddTokenDialog, setShowAddTokenDialog] = useState(false);
  const [showEditAccountNameDialog, setShowEditAccountNameDialog] = useState(
    false,
  );
  const [showMergeAccounts, setShowMergeAccounts] = useState(false);
  const [showFtxPayDialog, setShowFtxPayDialog] = useState(false);
  const [sortAccounts, setSortAccounts] = useState(SortAccounts.None);
  const [showDomains, setShowDomains] = useState(false);
  const { accounts, setAccountName } = useWalletSelector();
  const [isCopied, setIsCopied] = useState(false);
  const isExtensionWidth = useIsExtensionWidth();
  // Dummy var to force rerenders on demand.
  const [, setForceUpdate] = useState(false);
  const region = useRegion();
  const selectedAccount = accounts.find((a) => a.isSelected);
  const allTokensLoaded = loaded && fairsIsLoaded(publicKeys);
  let sortedPublicKeys = publicKeys;
  if (allTokensLoaded && sortAccounts !== SortAccounts.None) {
    sortedPublicKeys = [...publicKeys];
    sortedPublicKeys.sort((a, b) => {
      const aVal = usdValues[a.toString()];
      const bVal = usdValues[b.toString()];

      a = aVal === undefined || aVal === null ? -1 : aVal;
      b = bVal === undefined || bVal === null ? -1 : bVal;
      if (sortAccounts === SortAccounts.Descending) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (b < a) {
          return -1;
        } else if (b > a) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
  const totalUsdValue = publicKeys
    .filter((pk) => usdValues[pk.toString()])
    .map((pk) => usdValues[pk.toString()])
    .reduce((a, b) => a + b, 0.0);

  // Memoized callback and component for the `BalanceListItems`.
  //
  // The `BalancesList` fetches data, e.g., fairs for tokens using React hooks
  // in each of the child `BalanceListItem` components. However, we want the
  // parent component, to aggregate all of this data together, for example,
  // to show the cumulative USD amount in the wallet.
  //
  // To achieve this, we need to pass a callback from the parent to the chlid,
  // so that the parent can collect the results of all the async network requests.
  // However, this can cause a render loop, since invoking the callback can cause
  // the parent to rerender, which causese the child to rerender, which causes
  // the callback to be invoked.
  //
  // To solve this, we memoize all the `BalanceListItem` children components.
  const setUsdValuesCallback = useCallback(
    (publicKey, usdValue) => {
      if (usdValues[publicKey.toString()] !== usdValue) {
        usdValues[publicKey.toString()] = usdValue;
        if (fairsIsLoaded(publicKeys)) {
          setForceUpdate((forceUpdate) => !forceUpdate);
        }
      }
    },
    [publicKeys],
  );
  const balanceListItemsMemo = useMemo(() => {
    return sortedPublicKeys.map((pk) => {
      return React.memo((props) => {
        return (
          <BalanceListItem
            key={pk.toString()}
            publicKey={pk}
            setUsdValue={setUsdValuesCallback}
          />
        );
      });
    });
  }, [sortedPublicKeys, setUsdValuesCallback]);

  const iconSize = isExtensionWidth ? 'small' : 'medium';

  return (
    <Paper>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <CopyToClipboard
            text={selectedAccount && selectedAccount.address.toBase58()}
            onCopy={() => {
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1000);
            }}
          >
            <Tooltip
              title={
                <Typography>
                  {isCopied ? 'Copied' : 'Copy to clipboard'}
                </Typography>
              }
              style={{ fontSize: '10rem' }}
            >
              <Typography
                variant="h6"
                style={{
                  flexGrow: 1,
                  fontSize: isExtensionWidth && '1rem',
                  cursor: 'pointer',
                }}
                hover={true}
                component="h2"
              >
                {selectedAccount && selectedAccount.name}
                {isExtensionWidth
                  ? ''
                  : ` (${
                      selectedAccount &&
                      shortenAddress(selectedAccount.address.toBase58())
                    })`}{' '}
                {allTokensLoaded && (
                  <>({numberFormat.format(totalUsdValue.toFixed(2))})</>
                )}
              </Typography>
            </Tooltip>
          </CopyToClipboard>
          {selectedAccount &&
            selectedAccount.name !== 'Main account' &&
            selectedAccount.name !== 'Hardware wallet' && (
              <Tooltip title="Edit Account Name" arrow>
                <IconButton
                  size={iconSize}
                  onClick={() => setShowEditAccountNameDialog(true)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          <Tooltip title="Deposit via FTX Pay" arrow>
            <IconButton
              size={iconSize}
              onClick={() => setShowFtxPayDialog(true)}
            >
              <img
                title={'FTX Pay'}
                alt={'FTX Pay'}
                style={{
                  width: 20,
                  height: 20,
                }}
                src={ftxPayIcon}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="See your domains" arrow>
            <IconButton size={iconSize} onClick={() => setShowDomains(true)}>
              <DnsIcon />
            </IconButton>
          </Tooltip>
          <DomainsList open={showDomains} setOpen={setShowDomains} />
          {region.result && !region.result.isRestricted && <SwapButton size={iconSize} />}
          <Tooltip title="Migrate Tokens" arrow>
            <IconButton
              size={iconSize}
              onClick={() => setShowMergeAccounts(true)}
            >
              <MergeType />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Token" arrow>
            <IconButton
              size={iconSize}
              onClick={() => setShowAddTokenDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort Tokens" arrow>
            <IconButton
              size={iconSize}
              onClick={() => {
                switch (sortAccounts) {
                  case SortAccounts.None:
                    setSortAccounts(SortAccounts.Ascending);
                    return;
                  case SortAccounts.Ascending:
                    setSortAccounts(SortAccounts.Descending);
                    return;
                  case SortAccounts.Descending:
                    setSortAccounts(SortAccounts.None);
                    return;
                  default:
                    console.error('invalid sort type', sortAccounts);
                }
              }}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh" arrow>
            <IconButton
              size={iconSize}
              onClick={() => {
                refreshWalletPublicKeys(wallet);
                publicKeys.map((publicKey) =>
                  refreshAccountInfo(wallet.connection, publicKey, true),
                );
              }}
              style={{ marginRight: -12 }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {balanceListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
        {loaded ? null : <LoadingIndicator />}
      </List>
      <AddTokenDialog
        open={showAddTokenDialog}
        onClose={() => setShowAddTokenDialog(false)}
      />
      <FtxPayDialog
        open={showFtxPayDialog}
        publicKeys={publicKeys}
        onClose={() => setShowFtxPayDialog(false)}
      />
      <EditAccountNameDialog
        open={showEditAccountNameDialog}
        onClose={() => setShowEditAccountNameDialog(false)}
        oldName={selectedAccount ? selectedAccount.name : ''}
        onEdit={(name) => {
          setAccountName(selectedAccount.selector, name);
          setShowEditAccountNameDialog(false);
        }}
      />
      <MergeAccountsDialog
        open={showMergeAccounts}
        onClose={() => setShowMergeAccounts(false)}
      />
    </Paper>
  );
}