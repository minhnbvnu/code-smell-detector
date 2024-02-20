function SwapButtonDialog({ size }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendTransaction] = useSendTransaction();
  const connection = useConnection();
  const wallet = useWallet();
  const tokenInfos = useTokenInfos();
  const tokenList = tokenInfos && new TokenListContainer(tokenInfos);
  const provider = new NotifyingProvider(connection, wallet, sendTransaction);
  return (
    <>
      <Tooltip title="Swap Tokens">
        <IconButton size={size} onClick={() => setDialogOpen(true)}>
          <SwapHoriz />
        </IconButton>
      </Tooltip>
      <DialogForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Swap
            provider={provider}
            tokenList={tokenList}
            containerStyle={{
              width: '100%',
              boxShadow: 'none',
            }}
          />
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogActions>
        </div>
      </DialogForm>
    </>
  );
}