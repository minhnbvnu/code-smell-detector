function WalletPage() {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  return (
    <Container fixed maxWidth="md" className={classes.container}>
      <Grid container spacing={isExtensionWidth ? 0 : 3}>
        <Grid item xs={12} className={classes.balancesContainer}>
          <BalancesList />
        </Grid>
      </Grid>
    </Container>
  );
}