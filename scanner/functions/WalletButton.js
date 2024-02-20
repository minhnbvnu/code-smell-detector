function WalletButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('wallet');

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Wallet Balances">
          <IconButton color="inherit" onClick={onClick}>
            <MonetizationOn />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Button color="inherit" onClick={onClick} className={classes.button}>
          Wallet
        </Button>
      </Hidden>
    </>
  );
}