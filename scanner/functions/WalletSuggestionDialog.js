function WalletSuggestionDialog({ open, onClose, onIgnore }) {
  const classes = useStyles();
  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>Looking for a Wallet?</DialogTitle>
      <DialogContent>
        <Typography>
          For the best Solana experience, it is recommended to use{' '}
          <b>Backpack</b>
        </Typography>
        <List disablePadding style={{ marginTop: '16px' }}>
          <ListItem button disablePadding style={{ padding: 0 }}>
            <div
              className={classes.walletButton}
              style={{ display: 'flex' }}
              onClick={() => {
                window.location = 'https://backpack.app/download';
              }}
            >
              <div>
                <img
                  alt=""
                  style={{ height: '39px' }}
                  src="https://github.com/coral-xyz/backpack/raw/master/assets/backpack.png"
                />
              </div>
              <div>
                <Typography
                  style={{
                    marginLeft: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '39px',
                    fontWeight: 'bold',
                  }}
                >
                  Backpack
                </Typography>
              </div>
            </div>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" onClick={onIgnore}>
          Ignore Future Dialog
        </Button>
        <Button type="submit" color="primary" onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </DialogForm>
  );
}