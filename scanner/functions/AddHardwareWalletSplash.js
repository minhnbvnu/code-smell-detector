function AddHardwareWalletSplash({ onContinue, onClose }) {
  return (
    <>
      <DialogTitle>Add hardware wallet</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <b>
            Connect your ledger and open the Solana application. When you are
            ready, click "continue".
          </b>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onContinue}>
          Continue
        </Button>
      </DialogActions>
    </>
  );
}