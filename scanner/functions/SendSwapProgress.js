function SendSwapProgress({ publicKey, signature, onClose, blockchain }) {
  const connection = useConnection();
  const [swaps] = useSwapApiGet(`swaps_from/sol/${publicKey.toBase58()}`, {
    refreshInterval: 1000,
  });
  const [confirms] = useAsyncData(
    async () => {
      const { value } = await connection.getSignatureStatus(signature);
      return value?.confirmations;
    },
    [connection.getSignatureStatus, signature],
    { refreshInterval: 2000 },
  );

  let step = 1;
  let ethTxid = null;
  for (let swap of swaps || []) {
    const { deposit, withdrawal } = swap;
    if (deposit.txid === signature) {
      if (withdrawal.txid?.startsWith('0x')) {
        step = 3;
        ethTxid = withdrawal.txid;
      } else if (withdrawal.txid && blockchain !== 'eth') {
        step = 3;
      } else {
        step = 2;
      }
    }
  }

  return (
    <>
      <DialogContent>
        <Stepper activeStep={step}>
          <Step>
            <StepLabel>Send Request</StepLabel>
          </Step>
          <Step>
            <StepLabel>Wait for Confirmations</StepLabel>
          </Step>
          <Step>
            <StepLabel>Withdraw Funds</StepLabel>
          </Step>
        </Stepper>
        {ethTxid ? (
          <Typography variant="body2" align="center">
            <Link
              href={`https://etherscan.io/tx/${ethTxid}`}
              target="_blank"
              rel="noopener"
            >
              View on Etherscan
            </Link>
          </Typography>
        ) : step < 3 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: 16 }}>
              <CircularProgress />
            </div>
            {confirms ? (
              <Typography>{confirms} / 35 Confirmations</Typography>
            ) : (
              <Typography>Transaction Pending</Typography>
            )}
          </div>
        ) : null}
        {!ethTxid && blockchain === 'eth' ? (
          <DialogContentText style={{ marginTop: 16, marginBottom: 0 }}>
            Please keep this window open. You will need to approve the request
            on MetaMask to complete the transaction.
          </DialogContentText>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  );
}