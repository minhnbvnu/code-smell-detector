function SeedWordsForm({ mnemonicAndSeed, goForward }) {
  const [confirmed, setConfirmed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [seedCheck, setSeedCheck] = useState('');

  const downloadMnemonic = (mnemonic) => {
    const url = window.URL.createObjectURL(new Blob([mnemonic]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sollet.bak');
    document.body.appendChild(link);
    link.click();
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create New Wallet
          </Typography>
          <Typography paragraph>
            Create a new wallet to hold Solana and SPL tokens.
          </Typography>
          <Typography>
            Please write down the following twenty four words and keep them in a
            safe place:
          </Typography>
          {mnemonicAndSeed ? (
            <TextField
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              value={mnemonicAndSeed.mnemonic}
              label="Seed Words"
              onFocus={(e) => e.currentTarget.select()}
            />
          ) : (
            <LoadingIndicator />
          )}
          <Typography paragraph>
            Your private keys are only stored on your current computer or device.
            You will need these words to restore your wallet if your browser's
            storage is cleared or your device is damaged or lost.
          </Typography>
          <Typography paragraph>
            By default, sollet will use <code>m/44'/501'/0'/0'</code> as the
            derivation path for the main wallet. To use an alternative path, try
            restoring an existing wallet.
          </Typography>
          <Typography paragraph>
            <b>Note:</b> For certain users, Sollet may <b>NOT</b> be secure. See{' '}
            <a
              style={{ color: 'inherit'}}
              href="https://medium.com/metamask/security-notice-extension-disk-encryption-issue-d437d4250863"
              target="__blank"
            >
              this article
            </a>{' '}to understand if you are at risk.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                disabled={!mnemonicAndSeed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
            }
            label="I have saved these words in a safe place."
          />
          <Typography paragraph>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={() => {
            downloadMnemonic(mnemonicAndSeed?.mnemonic);
            setDownloaded(true);
          }}>
            Download Backup Mnemonic File (Required)
          </Button>
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button color="primary" disabled={!confirmed || !downloaded} onClick={() => setShowDialog(true)}>
            Continue
          </Button>
        </CardActions>
      </Card>
      <DialogForm
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={goForward}
        fullWidth
      >
        <DialogTitle>{'Confirm Mnemonic'}</DialogTitle>
        <DialogContentText style={{ margin: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            Please re-enter your seed phrase to confirm that you have saved it.
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
          <Button onClick={() => setShowDialog(false)}>Close</Button>
          <Button
            type="submit"
            color="secondary"
            disabled={normalizeMnemonic(seedCheck) !== mnemonicAndSeed?.mnemonic}
          >
            Continue
          </Button>
        </DialogActions>
      </DialogForm>
    </>
  );
}