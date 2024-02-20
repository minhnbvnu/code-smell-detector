function LedgerAccounts({ onContinue, onClose, open }) {
  const [dPathMenuItem, setDPathMenuItem] = useState(
    DerivationPathMenuItem.Bip44Root,
  );
  const { enqueueSnackbar } = useSnackbar();
  const [accounts, setAccounts] = useState(null);
  const onClick = (provider) => {
    onContinue({
      provider,
      publicKey: provider.pubKey,
      derivationPath: provider.derivationPath,
      account: provider.account,
      change: provider.change,
    });
  };
  useEffect(() => {
    if (open) {
      const fetch = async () => {
        let accounts = [];
        if (dPathMenuItem === DerivationPathMenuItem.Bip44Root) {
          let provider = new LedgerWalletProvider({
            derivationPath: toDerivationPath(dPathMenuItem),
          });
          accounts.push(await provider.init());
        } else {
          setAccounts(null);
          // Loading in parallel makes the ledger upset. So do it serially.
          for (let k = 0; k < 10; k += 1) {
            let provider = new LedgerWalletProvider({
              derivationPath: toDerivationPath(dPathMenuItem),
              account: k,
            });
            accounts.push(await provider.init());
          }
        }
        setAccounts(accounts);
      };
      fetch().catch((err) => {
        console.log(`received error when attempting to connect ledger: ${err}`);
        if (err && err.statusCode === 0x6804) {
          enqueueSnackbar('Unlock ledger device', { variant: 'error' });
        }
        onClose();
      });
    }
  }, [dPathMenuItem, enqueueSnackbar, open, onClose]);
  return (
    <Card elevation={0}>
      {accounts === null ? (
        <div style={{ padding: '24px' }}>
          <Typography align="center">
            Loading accounts from your hardware wallet
          </Typography>
          <CircularProgress
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>
      ) : (
        <AccountsSelector
          showRoot={true}
          onClick={onClick}
          accounts={accounts}
          setDPathMenuItem={setDPathMenuItem}
          dPathMenuItem={dPathMenuItem}
        />
      )}
    </Card>
  );
}