function MetamaskDeposit({ swapInfo, insufficientEthBalance }) {
  const ethAccount = useEthAccount();
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null);
  const callAsync = useCallAsync();

  const {
    address: swapAddress,
    memo: destination,
    coin: { erc20Contract: erc20Address, ticker },
  } = swapInfo;

  const [maxAmount, maxAmountLoaded] = useAsyncData(async () => {
    if (ethAccount) {
      return Math.min(
        await getErc20Balance(ethAccount, erc20Address),
        swapInfo.maxSize ?? Infinity,
      );
    }
    return 0;
  }, tuple(getErc20Balance, ethAccount, erc20Address));

  if (!ethAccount) {
    return <ConnectToMetamaskButton />;
  }

  async function submit() {
    setSubmitted(true);
    setStatus({ step: 0 });
    await callAsync(
      (async () => {
        let parsedAmount = parseFloat(amount);

        if (!parsedAmount || parsedAmount > maxAmount || parsedAmount <= 0) {
          throw new Error('Invalid amount');
        }
        await swapErc20ToSpl({
          ethAccount,
          erc20Address,
          swapAddress,
          destination,
          amount,
          onStatusChange: (e) => setStatus((status) => ({ ...status, ...e })),
        });
      })(),
      { onError: () => setSubmitted(false) },
    );
  }

  if (!submitted) {
    let convertButton = (
      <Button
        color="primary"
        style={{ marginLeft: 8 }}
        onClick={submit}
        disabled={insufficientEthBalance}
      >
        Convert
      </Button>
    );

    if (insufficientEthBalance) {
      convertButton = (
        <Tooltip
          title="Insufficient ETH for withdrawal transaction fee"
          placement="top"
        >
          <span>{convertButton}</span>
        </Tooltip>
      );
    }

    return (
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <TextField
          label="Amount"
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{ticker}</InputAdornment>
            ),
            inputProps: {
              step: 'any',
            },
          }}
          value={amount}
          onChange={(e) => setAmount(e.target.value.trim())}
          helperText={
            maxAmountLoaded ? (
              <span onClick={() => setAmount(maxAmount.toFixed(6))}>
                Max: {maxAmount.toFixed(6)}
              </span>
            ) : null
          }
        />
        {convertButton}
      </div>
    );
  }

  return (
    <>
      <Stepper activeStep={status.step}>
        <Step>
          <StepLabel>Approve Conversion</StepLabel>
        </Step>
        <Step>
          <StepLabel>Send Funds</StepLabel>
        </Step>
        <Step>
          <StepLabel>Wait for Confirmations</StepLabel>
        </Step>
      </Stepper>
      {status.step === 2 ? (
        <>
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
            <div>
              {status.confirms ? (
                <Typography>{status.confirms} / 12 Confirmations</Typography>
              ) : (
                <Typography>Transaction Pending</Typography>
              )}
              <Typography variant="body2">
                <Link
                  href={`https://etherscan.io/tx/${status.txid}`}
                  target="_blank"
                  rel="noopener"
                >
                  View on Etherscan
                </Link>
              </Typography>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}