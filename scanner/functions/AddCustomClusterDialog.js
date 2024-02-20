function AddCustomClusterDialog({ open, onAdd, onClose }) {
  const [name, setName] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  return (
    <DialogForm
      open={open}
      onEnter={() => {
        setName('');
        setApiUrl('');
      }}
      onClose={onClose}
      onSubmit={() => onAdd({ name, apiUrl })}
      fullWidth
    >
      <DialogTitle>Add Custom Network</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <TextField
            label="Url"
            fullWidth
            variant="outlined"
            margin="normal"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value.trim())}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" color="primary">
          Add
        </Button>
      </DialogActions>
    </DialogForm>
  );
}