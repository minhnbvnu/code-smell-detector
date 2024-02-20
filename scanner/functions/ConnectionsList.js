function ConnectionsList() {
  const isExtensionWidth = useIsExtensionWidth();
  const connectedWallets = useConnectedWallets();

  return (
    <Paper>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, fontSize: isExtensionWidth && '1rem' }}
            component="h2"
          >
            Connected Dapps
          </Typography>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {Object.entries(connectedWallets).map(([origin, connectedWallet]) => (
          <ConnectionsListItem
            origin={origin}
            connectedWallet={connectedWallet}
            key={origin}
          />
        ))}
      </List>
    </Paper>
  );
}