function NavigationFrame({ children }) {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  return (
    <>
      <AppBar position="static">
        {!isExtension && (
          <div
            style={{
              textAlign: 'center',
              background: '#fafafa',
              color: 'black',
              paddingLeft: '24px',
              paddingRight: '24px',
              fontSize: '14px',
            }}
          >
            <Typography>
              Beware of sites attempting to impersonate sollet.io or other DeFi
              services.
            </Typography>
          </div>
        )}
        <Toolbar>
          <Typography variant="h6" className={classes.title} component="h1">
            {isExtensionWidth ? 'Sollet' : 'Solana SPL Token Wallet'}
          </Typography>
          <NavigationButtons />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
      {!isExtensionWidth && <Footer />}
    </>
  );
}