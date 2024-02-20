function WalletSelector() {
  const {
    accounts,
    derivedAccounts,
    hardwareWalletAccount,
    setHardwareWalletAccount,
    setWalletSelector,
    addAccount,
  } = useWalletSelector();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [
    addHardwareWalletDialogOpen,
    setAddHardwareWalletDialogOpen,
  ] = useState(false);
  const [deleteMnemonicOpen, setDeleteMnemonicOpen] = useState(false);
  const [exportMnemonicOpen, setExportMnemonicOpen] = useState(false);
  const classes = useStyles();

  if (accounts.length === 0) {
    return null;
  }
  return (
    <>
      <AddHardwareWalletDialog
        open={addHardwareWalletDialogOpen}
        onClose={() => setAddHardwareWalletDialogOpen(false)}
        onAdd={({ publicKey, derivationPath, account, change }) => {
          setHardwareWalletAccount({
            name: 'Hardware wallet',
            publicKey,
            importedAccount: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
          setWalletSelector({
            walletIndex: undefined,
            importedPubkey: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
        }}
      />
      <AddAccountDialog
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        onAdd={({ name, importedAccount }) => {
          addAccount({ name, importedAccount });
          setWalletSelector({
            walletIndex: importedAccount ? undefined : derivedAccounts.length,
            importedPubkey: importedAccount
              ? importedAccount.publicKey.toString()
              : undefined,
            ledger: false,
          });
          setAddAccountOpen(false);
        }}
      />
      <ExportMnemonicDialog
        open={exportMnemonicOpen}
        onClose={() => setExportMnemonicOpen(false)}
      />
      <DeleteMnemonicDialog
        open={deleteMnemonicOpen}
        onClose={() => setDeleteMnemonicOpen(false)}
      />
      <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          Account
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Account" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {accounts.map((account) => (
          <AccountListItem
            account={account}
            classes={classes}
            setAnchorEl={setAnchorEl}
            setWalletSelector={setWalletSelector}
          />
        ))}
        {hardwareWalletAccount && (
          <>
            <Divider />
            <AccountListItem
              account={hardwareWalletAccount}
              classes={classes}
              setAnchorEl={setAnchorEl}
              setWalletSelector={setWalletSelector}
            />
          </>
        )}
        <Divider />
        <MenuItem onClick={() => setAddHardwareWalletDialogOpen(true)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <UsbIcon fontSize="small" />
          </ListItemIcon>
          Import Hardware Wallet
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setAddAccountOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setExportMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ImportExportIcon fontSize="small" />
          </ListItemIcon>
          Export Mnemonic
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          {'Delete Mnemonic & Log Out'}
        </MenuItem>
      </Menu>
    </>
  );
}