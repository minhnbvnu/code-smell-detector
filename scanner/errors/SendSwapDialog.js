function SendSwapDialog({
  onClose,
  publicKey,
  balanceInfo,
  swapCoinInfo,
  ethAccount,
  wusdcToSplUsdc = false,
  wusdtToSplUsdt = false,
  usdcToSplWUsdc = false,
  onSubmitRef,
}) {
  const wallet = useWallet();
  const [sendTransaction, sending] = useSendTransaction();
  const [signature, setSignature] = useState(null);
  const {
    fields,
    destinationAddress,
    transferAmountString,
    setDestinationAddress,
    validAmount,
  } = useForm(balanceInfo);

  const { tokenName, decimals, mint } = balanceInfo;
  const blockchain =
    wusdcToSplUsdc || wusdtToSplUsdt || usdcToSplWUsdc
      ? 'sol'
      : swapCoinInfo.blockchain === 'sol'
      ? 'eth'
      : swapCoinInfo.blockchain;
  const needMetamask = blockchain === 'eth';

  const [ethBalance] = useAsyncData(
    () => getErc20Balance(ethAccount),
    'ethBalance',
    {
      refreshInterval: 2000,
    },
  );
  const ethFeeData = useSwapApiGet(
    blockchain === 'eth' &&
      `fees/eth/${ethAccount}` +
        (swapCoinInfo.erc20Contract ? '/' + swapCoinInfo.erc20Contract : ''),
    { refreshInterval: 2000 },
  );
  const [ethFeeEstimate] = ethFeeData;
  const insufficientEthBalance =
    typeof ethBalance === 'number' &&
    typeof ethFeeEstimate === 'number' &&
    ethBalance < ethFeeEstimate;

  useEffect(() => {
    if (blockchain === 'eth' && ethAccount) {
      setDestinationAddress(ethAccount);
    }
  }, [blockchain, ethAccount, setDestinationAddress]);

  let splUsdcWalletAddress = useWalletAddressForMint(
    wusdcToSplUsdc ? USDC_MINT : null,
  );
  let splUsdtWalletAddress = useWalletAddressForMint(
    wusdtToSplUsdt ? USDT_MINT : null,
  );
  let splWUsdcWalletAddress = useWalletAddressForMint(
    usdcToSplWUsdc ? WUSDC_MINT : null,
  );
  useEffect(() => {
    if (wusdcToSplUsdc && splUsdcWalletAddress) {
      setDestinationAddress(splUsdcWalletAddress);
    } else if (wusdtToSplUsdt && splUsdtWalletAddress) {
      setDestinationAddress(splUsdtWalletAddress);
    } else if (usdcToSplWUsdc && splWUsdcWalletAddress) {
      setDestinationAddress(splWUsdcWalletAddress);
    }
  }, [
    setDestinationAddress,
    wusdcToSplUsdc,
    splUsdcWalletAddress,
    wusdtToSplUsdt,
    splUsdtWalletAddress,
    usdcToSplWUsdc,
    splWUsdcWalletAddress,
  ]);

  async function makeTransaction() {
    let amount = Math.round(parseFloat(transferAmountString) * 10 ** decimals);
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }
    const params = {
      blockchain,
      address: destinationAddress,
      size: amount / 10 ** decimals,
    };
    if (blockchain === 'sol') {
      params.coin = swapCoinInfo.splMint;
    } else if (blockchain === 'eth') {
      params.coin = swapCoinInfo.erc20Contract;
    }
    if (mint?.equals(WUSDC_MINT)) {
      params.wusdcToUsdc = true;
    } else if (mint?.equals(USDC_MINT)) {
      if (usdcToSplWUsdc) {
        params.usdcToWUsdc = true;
        params.coin = WUSDC_MINT.toString();
      }
    } else if (mint?.equals(WUSDT_MINT)) {
      params.wusdtToUsdt = true;
    }
    const swapInfo = await swapApiRequest('POST', 'swap_to', params);
    if (swapInfo.blockchain !== 'sol') {
      throw new Error('Unexpected blockchain');
    }
    return wallet.transferToken(
      publicKey,
      new PublicKey(swapInfo.address),
      amount,
      balanceInfo.mint,
      decimals,
      swapInfo.memo,
    );
  }

  async function onSubmit() {
    return sendTransaction(makeTransaction(), { onSuccess: setSignature });
  }
  onSubmitRef.current = onSubmit;

  if (signature) {
    return (
      <SendSwapProgress
        key={signature}
        publicKey={publicKey}
        signature={signature}
        blockchain={blockchain}
        onClose={onClose}
      />
    );
  }
  const bitcoinDisable =
    blockchain === 'btc' ? parseFloat(transferAmountString) < 0.001 : false;
  let sendButton = (
    <Button
      type="submit"
      color="primary"
      disabled={
        sending ||
        (needMetamask && !ethAccount) ||
        !validAmount ||
        insufficientEthBalance ||
        bitcoinDisable
      }
    >
      Send
    </Button>
  );

  if (insufficientEthBalance) {
    sendButton = (
      <Tooltip
        title="Insufficient ETH for withdrawal transaction fee"
        placement="top"
      >
        <span>{sendButton}</span>
      </Tooltip>
    );
  }

  return (
    <>
      <DialogContent style={{ paddingTop: 16 }}>
        <DialogContentText>
          SPL {tokenName} can be converted to{' '}
          {blockchain === 'eth' && swapCoinInfo.erc20Contract
            ? 'ERC20'
            : blockchain === 'sol' && swapCoinInfo.splMint
            ? 'SPL'
            : 'native'}{' '}
          {swapCoinInfo.ticker}
          {needMetamask ? ' via MetaMask' : null}.
        </DialogContentText>
        {blockchain === 'eth' && (
          <DialogContentText>
            Estimated withdrawal transaction fee:
            <EthFeeEstimate
              ethFeeData={ethFeeData}
              insufficientEthBalance={insufficientEthBalance}
            />
          </DialogContentText>
        )}
        {needMetamask && !ethAccount ? <ConnectToMetamaskButton /> : fields}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {sendButton}
      </DialogActions>
    </>
  );
}