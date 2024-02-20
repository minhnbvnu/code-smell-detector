function useForm(
  balanceInfo,
  addressHelperText,
  passAddressValidation,
  overrideValidation,
) {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [transferAmountString, setTransferAmountString] = useState('');
  const { amount: balanceAmount, decimals, tokenSymbol } = balanceInfo;

  const parsedAmount = parseFloat(transferAmountString) * 10 ** decimals;
  const validAmount = parsedAmount > 0 && parsedAmount <= balanceAmount;

  const fields = (
    <>
      <TextField
        label="Recipient Address"
        fullWidth
        variant="outlined"
        margin="normal"
        value={destinationAddress}
        onChange={(e) => setDestinationAddress(e.target.value.trim())}
        helperText={addressHelperText}
        id={
          !passAddressValidation && passAddressValidation !== undefined
            ? 'outlined-error-helper-text'
            : undefined
        }
        error={!passAddressValidation && passAddressValidation !== undefined}
      />
      <TextField
        label="Amount"
        fullWidth
        variant="outlined"
        margin="normal"
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={() =>
                  setTransferAmountString(
                    balanceAmountToUserAmount(balanceAmount, decimals),
                  )
                }
              >
                MAX
              </Button>
              {tokenSymbol ? tokenSymbol : null}
            </InputAdornment>
          ),
          inputProps: {
            step: Math.pow(10, -decimals),
          },
        }}
        value={transferAmountString}
        onChange={(e) => setTransferAmountString(e.target.value.trim())}
        helperText={
          <span
            onClick={() =>
              setTransferAmountString(
                balanceAmountToUserAmount(balanceAmount, decimals),
              )
            }
          >
            Max: {balanceAmountToUserAmount(balanceAmount, decimals)}
          </span>
        }
      />
    </>
  );

  return {
    fields,
    destinationAddress,
    transferAmountString,
    setDestinationAddress,
    validAmount,
  };
}