function ApproveConnectionForm({ origin, onApprove }) {
  const wallet = useWallet();
  const { accounts, hardwareWalletAccount } = useWalletSelector();
  // TODO better way to do this
  const account = accounts
    .concat([hardwareWalletAccount])
    .find((account) => account && account.address.equals(wallet.publicKey));
  const classes = useStyles();
  const [autoApprove, setAutoApprove] = useState(false);
  let [dismissed, setDismissed] = useLocalStorageState(
    'dismissedAutoApproveWarning',
    false,
  );
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom>
          Allow this site to access your Solana account?
        </Typography>
        <div className={classes.connection}>
          <Typography>{origin}</Typography>
          <ImportExportIcon fontSize="large" />
          <Typography>{account.name}</Typography>
          <Typography variant="caption">
            ({wallet.publicKey.toBase58()})
          </Typography>
        </div>
        <Typography>Only connect with sites you trust.</Typography>
        <Divider className={classes.divider} />
        <FormControlLabel
          control={
            <Switch
              checked={autoApprove}
              onChange={() => setAutoApprove(!autoApprove)}
              color="primary"
            />
          }
          label={`Automatically approve transactions from ${origin}`}
        />
        {!dismissed && autoApprove && (
          <SnackbarContent
            className={classes.warningContainer}
            message={
              <div>
                <span className={classes.warningTitle}>
                  <WarningIcon className={classes.warningIcon} />
                  Use at your own risk.
                </span>
                <Typography className={classes.warningMessage}>
                  This setting allows sending some transactions on your behalf
                  without requesting your permission for the remainder of this
                  session.
                </Typography>
              </div>
            }
            action={[
              <Button onClick={() => setDismissed('1')}>I understand</Button>,
            ]}
            classes={{ root: classes.snackbarRoot }}
          />
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={window.close}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => onApprove(autoApprove)}
          disabled={!dismissed && autoApprove}
        >
          Connect
        </Button>
      </CardActions>
    </Card>
  );
}