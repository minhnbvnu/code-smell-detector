function ConnectionsButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('connections');
  const connectedWallets = useConnectedWallets();

  const connectionAmount = Object.keys(connectedWallets).length;

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Manage Connections">
          <IconButton color="inherit" onClick={onClick}>
            <Badge
              badgeContent={connectionAmount}
              classes={{ badge: classes.badge }}
            >
              <ConnectionIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Badge
          badgeContent={connectionAmount}
          classes={{ badge: classes.badge }}
        >
          <Button color="inherit" onClick={onClick} className={classes.button}>
            Connections
          </Button>
        </Badge>
      </Hidden>
    </>
  );
}