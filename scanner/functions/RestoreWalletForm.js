function RestoreWalletForm({ goBack }) {
  const [rawMnemonic, setRawMnemonic] = useState('');
  const [seed, setSeed] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [next, setNext] = useState(false);

  const mnemonic = normalizeMnemonic(rawMnemonic);
  const isNextBtnEnabled =
    password === passwordConfirm && validateMnemonic(mnemonic);
  const displayInvalidMnemonic = validateMnemonic(mnemonic) === false && mnemonic.length > 0;
  return (
    <>
      {next ? (
        <DerivedAccounts
          goBack={() => setNext(false)}
          mnemonic={mnemonic}
          password={password}
          seed={seed}
        />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Restore Existing Wallet
            </Typography>
            <Typography>
              Restore your wallet using your twelve or twenty-four seed words.
              Note that this will delete any existing wallet on this device.
            </Typography>
            <br />
            <Typography fontWeight="fontWeightBold">
              <b>Do not enter your hardware wallet seedphrase here.</b> Hardware
              wallets can be optionally connected after a web wallet is created.
            </Typography>
            {displayInvalidMnemonic && (
               <Typography fontWeight="fontWeightBold" style={{ color: 'red' }}>
                 Mnemonic validation failed. Please enter a valid BIP 39 seed phrase.
               </Typography>
            )}
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              label="Seed Words"
              value={rawMnemonic}
              onChange={(e) => setRawMnemonic(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="New Password (Optional)"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </CardContent>
          <CardActions style={{ justifyContent: 'space-between' }}>
            <Button onClick={goBack}>Cancel</Button>
            <Button
              color="primary"
              disabled={!isNextBtnEnabled}
              onClick={() => {
                mnemonicToSeed(mnemonic).then((seed) => {
                  setSeed(seed);
                  setNext(true);
                });
              }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}