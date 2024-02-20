function AccountListItem({ account, classes, setAnchorEl, setWalletSelector }) {
  return (
    <MenuItem
      key={account.address.toBase58()}
      onClick={() => {
        setAnchorEl(null);
        setWalletSelector(account.selector);
      }}
      selected={account.isSelected}
      component="div"
    >
      <ListItemIcon className={classes.menuItemIcon}>
        {account.isSelected ? <CheckIcon fontSize="small" /> : null}
      </ListItemIcon>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>{account.name}</Typography>
        <Typography color="textSecondary">
          {account.address.toBase58()}
        </Typography>
      </div>
    </MenuItem>
  );
}