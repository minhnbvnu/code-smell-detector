function ConnectionsListItem({ origin, connectedWallet }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // TODO better way to get high res icon?
  const appleIconUrl = origin + '/apple-touch-icon.png';
  const faviconUrl = origin + '/favicon.ico';
  const [iconUrl, setIconUrl] = useState(appleIconUrl);
  const { accounts } = useWalletSelector();
  // TODO better way to do this
  const account = accounts.find(
    (account) => account.address.toBase58() === connectedWallet.publicKey,
  );

  const setAutoApprove = (autoApprove) => {
    chrome.storage.local.get('connectedWallets', (result) => {
      result.connectedWallets[origin].autoApprove = autoApprove;
      chrome.storage.local.set({ connectedWallets: result.connectedWallets });
    });
  };

  const disconnectWallet = () => {
    chrome.storage.local.get('connectedWallets', (result) => {
      delete result.connectedWallets[origin];
      chrome.storage.local.set({ connectedWallets: result.connectedWallets });
    });
  };

  return (
    <>
      <ListItem button onClick={() => setOpen((open) => !open)}>
        <ListItemIcon>
          <div className={classes.listItemIcon}>
            <img
              src={iconUrl}
              onError={() => setIconUrl(faviconUrl)}
              className={classes.listItemImage}
              alt=""
            />
          </div>
        </ListItemIcon>
        <div style={{ display: 'flex', flex: 1 }}>
          <ListItemText primary={origin} secondary={account.name} />
        </div>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div class={classes.itemDetails}>
          <div class={classes.buttonContainer}>
            <Button
              variant={connectedWallet.autoApprove ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              startIcon={<DoneAll />}
              onClick={() => setAutoApprove(!connectedWallet.autoApprove)}
            >
              {connectedWallet.autoApprove ? 'Auto-Approved' : 'Auto-Approve'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Collapse>
    </>
  );
}