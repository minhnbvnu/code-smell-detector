function MergeAccountsDialog({ open, onClose }) {
  const [publicKeys] = useWalletPublicKeys();
  const connection = useConnection();
  const wallet = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [isMerging, setIsMerging] = useState(false);
  const [mergeCheck, setMergeCheck] = useState('');
  const tokenInfos = useTokenInfos();

  // Merging accounts is a destructive operation that, for each mint,
  //
  // * Creates an associated token account, if not already created
  // * Moves all funds into the associated token account
  // * Closes every account, excluding the associated token account.
  //
  // Although it's ok if this operation fails--since the user can just
  // retry again--it's not a good experience; hence the retry logic.
  // The retry count of 30 is arbitrary and probably overly conservative.
  const mergeAccounts = async (retryCount = 30) => {
    try {
      if (retryCount === 0) {
        enqueueSnackbar(`Unable to complete migration. Please try again.`, {
          variant: 'error',
        });
        return;
      }
      // Fetch all token accounts owned by the wallet. An account is null
      // if we previously sent the close transaction, but did not receive
      // a response due to RPC node instability.
      const tokenAccounts = (
        await getMultipleSolanaAccounts(connection, publicKeys)
      )
        .filter(
          (acc) =>
            acc !== null &&
            acc.account.owner.equals(TokenInstructions.TOKEN_PROGRAM_ID),
        )
        .map(({ publicKey, account }) => {
          return {
            publicKey,
            account: parseTokenAccountData(account.data),
            owner: account.owner,
          };
        });

      // Group the token accounts by mint.
      const groupedTokenAccounts = {};
      tokenAccounts.forEach((ta) => {
        const key = ta.account.mint.toString();
        if (groupedTokenAccounts[key]) {
          groupedTokenAccounts[key].push(ta);
        } else {
          groupedTokenAccounts[key] = [ta];
        }
      });

      // For each mint, merge them into one, associated token account.
      const mints = Object.keys(groupedTokenAccounts);
      for (let k = 0; k < mints.length; k += 1) {
        const mintGroup = groupedTokenAccounts[mints[k]];
        if (mintGroup.length > 0) {
          const mint = mintGroup[0].account.mint;
          const assocTokAddr = await findAssociatedTokenAddress(
            wallet.publicKey,
            mint,
          );
          // Don't merge if the only account is the associated token address.
          if (
            !(
              mintGroup.length === 1 &&
              assocTokAddr.equals(mintGroup[0].publicKey)
            )
          ) {
            const tokenInfo = getTokenInfo(
              mint,
              connection._rpcEndpoint,
              tokenInfos,
            );
            const symbol = tokenInfo.symbol
              ? tokenInfo.symbol
              : mint.toString();
            console.log(`Migrating ${symbol}`);
            enqueueSnackbar(`Migrating ${symbol}`, {
              variant: 'info',
            });
            await mergeMint(
              assocTokAddr,
              mintGroup,
              mint,
              tokenInfo.decimals,
              wallet,
              connection,
              enqueueSnackbar,
            );
          }
        }
      }

      // Wait to give the RPC nodes some time to catch up.
      await sleep(5000);

      // Refresh the UI to remove any duplicates.
      await refresh(wallet, publicKeys);

      // Exit dialogue.
      close();
    } catch (err) {
      console.error('There was a problem migrating accounts', err);
      enqueueSnackbar('Could not confirm transaction. Please wait.', {
        variant: 'info',
      });

      // Sleep to give the RPC nodes some time to catch up.
      await sleep(10000);

      enqueueSnackbar('Retrying migration', { variant: 'info' });
      await mergeAccounts(retryCount - 1);
    }
  };
  const close = () => {
    setMergeCheck('');
    onClose();
  };
  const disabled = mergeCheck.toLowerCase() !== 'migrate';

  return (
    <Dialog disableBackdropClick={isMerging} open={open} onClose={onClose}>
      {isMerging ? (
        <DialogContent>
          <DialogContentText style={{ marginBottom: 0, textAlign: 'center' }}>
            Merging Accounts
          </DialogContentText>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <CircularProgress />
          </div>
        </DialogContent>
      ) : (
        <>
          <DialogTitle>Are you sure you want to migrate tokens?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <b>WARNING</b>: This action may break apps that depend on your
              existing token accounts.
            </DialogContentText>
            <DialogContentText>
              Migrating sends all tokens to{' '}
              <Link
                href={'https://spl.solana.com/associated-token-account'}
                target="_blank"
                rel="noopener"
              >
                associated token accounts
              </Link>{' '}
              <FingerprintIcon style={{ marginBottom: '-7px' }} />. If
              associated token accounts do not exist, then they will be created.
            </DialogContentText>
            <DialogContentText>
              If migrating fails during a period of high network load, you will
              not have lost your funds. Just recontinue the migration from where you
              left off. If you have a lot of accounts, migrating might take a
              while.
            </DialogContentText>
            <TextField
              label={`Please type "migrate" to confirm`}
              fullWidth
              variant="outlined"
              margin="normal"
              value={mergeCheck}
              onChange={(e) => setMergeCheck(e.target.value.trim())}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button
              disabled={disabled}
              onClick={() => {
                setIsMerging(true);
                mergeAccounts()
                  .then(() => {
                    enqueueSnackbar('Account migrate complete', {
                      variant: 'success',
                    });
                    setIsMerging(false);
                  })
                  .catch((err) => {
                    enqueueSnackbar(
                      `There was a problem merging your accounts: ${err.toString()}`,
                      { variant: 'error' },
                    );
                    setIsMerging(false);
                  });
              }}
              color="secondary"
              autoFocus
            >
              Migrate
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}