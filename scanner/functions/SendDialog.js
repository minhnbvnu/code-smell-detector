function SendDialog({ open, onClose, publicKey, balanceInfo }) {
  const isProdNetwork = useIsProdNetwork();
  const [tab, setTab] = useState('spl');
  const onSubmitRef = useRef();

  let [swapCoinInfo] = useSwapApiGet(
    showSwapAddress && balanceInfo.mint && isProdNetwork
      ? `coins/sol/${balanceInfo.mint.toBase58()}`
      : null,
  );

  // SwapInfos to ignore.
  if (
    swapCoinInfo &&
    swapCoinInfo.erc20Contract === '0x2b2e04bf86978b45bb2edf54aca876973bdd43c0'
  ) {
    swapCoinInfo = null;
  }

  const ethAccount = useEthAccount();
  const { mint, tokenName, tokenSymbol } = balanceInfo;

  const getTabs = (mint) => {
    // if sollet-private key not there, just show the SPL tab
    if (!localStorage.getItem('sollet-private'))
      return [
        <Tab label={`SPL ${swapCoinInfo.ticker}`} key="spl" value="spl" />,
        <Tab label={`Wormhole`} key="wormhole" value="wormhole" />,
      ];

    if (mint?.equals(WUSDC_MINT)) {
      return [
        <Tab label="SPL WUSDC" key="spl" value="spl" />,
        <Tab label={`Wormhole`} key="wormhole" value="wormhole" />,
        <Tab label="SPL USDC" key="wusdcToSplUsdc" value="wusdcToSplUsdc" />,
        <Tab label="ERC20 USDC" key="swap" value="swap" />,
      ];
    } else if (mint?.equals(WUSDT_MINT)) {
      return [
        <Tab label="SPL WUSDT" key="spl" value="spl" />,
        <Tab label={`Wormhole`} key="wormhole" value="wormhole" />,
        <Tab label="SPL USDT" key="wusdtToSplUsdt" value="wusdtToSplUsdt" />,
        <Tab label="ERC20 USDT" key="swap" value="swap" />,
      ];
    } else if (
      localStorage.getItem('sollet-private') &&
      mint?.equals(USDC_MINT)
    ) {
      return [
        <Tab label="SPL USDC" key="spl" value="spl" />,
        <Tab label={`Wormhole`} key="wormhole" value="wormhole" />,
        <Tab label="SPL WUSDC" key="usdcToSplWUsdc" value="usdcToSplWUsdc" />,
        <Tab label="ERC20 USDC" key="swap" value="swap" />,
      ];
    } else {
      const erc20Tab = (
        <Tab
          label={`${swapCoinInfo.erc20Contract ? 'ERC20' : 'Native'} ${
            swapCoinInfo.ticker
          }`}
          key="swap"
          value="swap"
        />
      );
      const tabs = [
        <Tab label={`SPL ${swapCoinInfo.ticker}`} key="spl" value="spl" />,
        <Tab label={`Wormhole`} key="wormhole" value="wormhole" />,
      ];
      if (
        !DISABLED_ERC20_MINTS.has(mint.toString()) ||
        localStorage.getItem('sollet-private')
      ) {
        tabs.push(erc20Tab);
      }
      return tabs;
    }
  };

  return (
    <>
      <DialogForm
        open={open}
        onClose={onClose}
        onSubmit={() => onSubmitRef.current()}
        fullWidth
      >
        <DialogTitle>
          Send {tokenName ?? abbreviateAddress(mint)}
          {tokenSymbol ? ` (${tokenSymbol})` : null}
          {ethAccount && (
            <div>
              <Typography color="textSecondary" style={{ fontSize: '14px' }}>
                Metamask connected: {ethAccount}
              </Typography>
            </div>
          )}
        </DialogTitle>
        {swapCoinInfo ? (
          <Tabs
            value={tab}
            variant="fullWidth"
            onChange={(e, value) => setTab(value)}
            textColor="primary"
            indicatorColor="primary"
          >
            {getTabs(mint)}
          </Tabs>
        ) : (
          <Tabs
            value={tab}
            variant="fullWidth"
            onChange={(e, value) => setTab(value)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="SPL" key="spl" value="spl" />
            <Tab label={`Wormhole`} key="wormhole" value="wormhole" />
          </Tabs>
        )}
        {tab === 'spl' ? (
          <SendSplDialog
            onClose={onClose}
            publicKey={publicKey}
            balanceInfo={balanceInfo}
            onSubmitRef={onSubmitRef}
          />
        ) : tab === 'wormhole' ? (
          <DialogContent>
            <DialogContentText>
              Please use the{' '}
              <a
                href="https://www.portalbridge.com/#/transfer"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white' }}
              >
                Wormhole Portal Bridge
              </a>{' '}
              to bridge your assets.
            </DialogContentText>
          </DialogContent>
        ) : tab === 'wusdcToSplUsdc' ? (
          <SendSwapDialog
            key={tab}
            onClose={onClose}
            publicKey={publicKey}
            balanceInfo={balanceInfo}
            swapCoinInfo={swapCoinInfo}
            onSubmitRef={onSubmitRef}
            wusdcToSplUsdc
          />
        ) : tab === 'wusdtToSplUsdt' ? (
          <SendSwapDialog
            key={tab}
            onClose={onClose}
            publicKey={publicKey}
            balanceInfo={balanceInfo}
            swapCoinInfo={swapCoinInfo}
            onSubmitRef={onSubmitRef}
            wusdtToSplUsdt
          />
        ) : tab === 'usdcToSplWUsdc' ? (
          <SendSwapDialog
            key={tab}
            onClose={onClose}
            publicKey={publicKey}
            balanceInfo={balanceInfo}
            swapCoinInfo={swapCoinInfo}
            onSubmitRef={onSubmitRef}
            usdcToSplWUsdc
          />
        ) : (
          <SendSwapDialog
            key={tab}
            onClose={onClose}
            publicKey={publicKey}
            balanceInfo={balanceInfo}
            swapCoinInfo={swapCoinInfo}
            ethAccount={ethAccount}
            onSubmitRef={onSubmitRef}
          />
        )}
      </DialogForm>
      {ethAccount &&
      (swapCoinInfo?.blockchain === 'eth' || swapCoinInfo?.erc20Contract) ? (
        <EthWithdrawalCompleter ethAccount={ethAccount} publicKey={publicKey} />
      ) : null}
    </>
  );
}