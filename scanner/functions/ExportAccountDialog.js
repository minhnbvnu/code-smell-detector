function ExportAccountDialog({ open, onClose }) {
  const wallet = useWallet();
  const [isHidden, setIsHidden] = useState(true);
  const keyOutput = `[${Array.from(wallet.provider.account.secretKey)}]`;
  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>Export account</DialogTitle>
      <DialogContent>
        <TextField
          label="Private key"
          fullWidth
          type={isHidden && 'password'}
          variant="outlined"
          margin="normal"
          value={keyOutput}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!isHidden}
              onChange={() => setIsHidden(!isHidden)}
            />
          }
          label="Reveal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </DialogForm>
  );
}