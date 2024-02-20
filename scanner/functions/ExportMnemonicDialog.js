function ExportMnemonicDialog({ open, onClose }) {
  const [isHidden, setIsHidden] = useState(true);
  const [mnemKey] = useUnlockedMnemonicAndSeed();
  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>Export mnemonic</DialogTitle>
      <DialogContent>
        <TextField
          label="Mnemonic"
          fullWidth
          type={isHidden && 'password'}
          variant="outlined"
          margin="normal"
          value={mnemKey.mnemonic}
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