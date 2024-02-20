function AccountsSelector({
  showRoot,
  showDeprecated,
  accounts,
  dPathMenuItem,
  setDPathMenuItem,
  onClick,
}) {
  return (
    <CardContent>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Derivable Accounts
        </Typography>
        <FormControl variant="outlined">
          <Select
            value={dPathMenuItem}
            onChange={(e) => {
              setDPathMenuItem(e.target.value);
            }}
          >
            {showRoot && (
              <MenuItem value={DerivationPathMenuItem.Bip44Root}>
                {`m/44'/501'`}
              </MenuItem>
            )}
            <MenuItem value={DerivationPathMenuItem.Bip44}>
              {`m/44'/501'/0'`}
            </MenuItem>
            <MenuItem value={DerivationPathMenuItem.Bip44Change}>
              {`m/44'/501'/0'/0'`}
            </MenuItem>
            {showDeprecated && (
              <MenuItem value={DerivationPathMenuItem.Deprecated}>
                {`m/501'/0'/0/0 (deprecated)`}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      {accounts.map((acc) => {
        return (
          <div onClick={onClick ? () => onClick(acc) : {}}>
            <BalanceListItem
              key={acc.publicKey.toString()}
              onClick={onClick}
              publicKey={acc.publicKey}
              expandable={false}
            />
          </div>
        );
      })}
    </CardContent>
  );
}