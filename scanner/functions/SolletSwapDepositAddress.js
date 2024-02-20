function SolletSwapDepositAddress({ balanceInfo, swapInfo, ethAccount }) {
  const [ethBalance] = useAsyncData(
    () => getErc20Balance(ethAccount),
    'ethBalance',
    {
      refreshInterval: 2000,
    },
  );

  const ethFeeData = useAsyncData(
    swapInfo.coin &&
      (() =>
        estimateErc20SwapFees({
          erc20Address: swapInfo.coin.erc20Contract,
          swapAddress: swapInfo.address,
          ethAccount,
        })),
    'depositEthFee',
    {
      refreshInterval: 2000,
    },
  );

  if (!swapInfo) {
    return null;
  }

  const ethFeeEstimate = Array.isArray(ethFeeData[0])
    ? ethFeeData[0].reduce((acc, elem) => acc + elem)
    : ethFeeData[0];
  const insufficientEthBalance =
    typeof ethBalance === 'number' &&
    typeof ethFeeEstimate === 'number' &&
    ethBalance < ethFeeEstimate;

  const { blockchain, address, memo, coin } = swapInfo;
  const { mint, tokenName } = balanceInfo;

  if (blockchain === 'btc' && memo === null) {
    return (
      <>
        <DialogContentText>
          Native BTC can be converted to SPL {tokenName} by sending it to the
          following address:
        </DialogContentText>
        <CopyableDisplay
          value={address}
          label="Native BTC Deposit Address"
          autoFocus
          qrCode={`bitcoin:${address}`}
        />
      </>
    );
  }

  if (localStorage.getItem('sollet-private') && blockchain === 'eth') {
    return (
      <>
        <DialogContentText>
          {coin.erc20Contract ? 'ERC20' : 'Native'} {coin.ticker} can be
          converted to {mint ? 'SPL' : 'native'} {tokenName} via MetaMask. To
          convert, you must already have SOL in your wallet.
        </DialogContentText>
        <DialogContentText>
          Estimated withdrawal transaction fee:
          <EthFeeEstimate
            ethFeeData={ethFeeData}
            insufficientEthBalance={insufficientEthBalance}
          />
        </DialogContentText>
        <MetamaskDeposit
          swapInfo={swapInfo}
          insufficientEthBalance={insufficientEthBalance}
        />
      </>
    );
  }

  return null;
}