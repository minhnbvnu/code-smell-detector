function ConfirmHardwareWallet({ account, onDone, onBack }) {
  const [didConfirm, setDidConfirm] = useState(false);
  useEffect(() => {
    if (!didConfirm) {
      account.provider
        .confirmPublicKey()
        .then(() => setDidConfirm(true))
        .catch((err) => {
          console.error('Error confirming', err);
          onBack();
        });
    }
  });
  return (
    <>
      <DialogTitle>Confirm your wallet address</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontWeight="fontWeightBold">
            Check your ledger and confirm the address displayed is the address
            chosen. Then click "done".
          </Typography>
          <Typography>{account.publicKey.toString()}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onBack}>
          Back
        </Button>
        <Button color="primary" onClick={onDone} disabled={!didConfirm}>
          Done
        </Button>
      </DialogActions>
    </>
  );
}