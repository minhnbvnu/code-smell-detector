function DeleteMnemonicDialog({ open, onClose }) {
  const [seedCheck, setSeedCheck] = useState('');
  const [mnemKey] = useUnlockedMnemonicAndSeed();
  return (
    <>
      <DialogForm
        open={open}
        onClose={onClose}
        onSubmit={() => {
          forgetWallet();
          onClose();
        }}
        fullWidth
      >
        <DialogTitle>{'Delete Mnemonic & Log Out'}</DialogTitle>
        <DialogContentText style={{ margin: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            You will not be able to recover the current accounts without the
            seed phrase, and the account private key. This action will delete
            all current accounts from your browser.
            <br />
            <br />
            <strong>
              To prevent loss of funds, please ensure you have the seed phrase
              and the private key for all current accounts. You can view it by selecting
              "Export Mnemonic" in the user menu.
            </strong>
          </div>
          <TextField
            label={`Please type your seed phrase to confirm`}
            fullWidth
            variant="outlined"
            margin="normal"
            value={seedCheck}
            onChange={(e) => setSeedCheck(e.target.value)}
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            type="submit"
            color="secondary"
            disabled={normalizeMnemonic(seedCheck) !== mnemKey.mnemonic}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogForm>
    </>
  );
}