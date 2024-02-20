function EthWithdrawalCompleterItem({ ethAccount, swap }) {
  const callAsync = useCallAsync();
  const { withdrawal } = swap;
  useEffect(() => {
    if (
      withdrawal.status === 'sent' &&
      withdrawal.blockchain === 'eth' &&
      withdrawal.txid &&
      !withdrawal.txid.startsWith('0x') &&
      withdrawal.txData
    ) {
      withdrawEth(ethAccount, withdrawal, callAsync);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawal.txid, withdrawal.status]);
  return null;
}