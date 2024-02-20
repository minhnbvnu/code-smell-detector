function SwapButtonPopover({ size }) {
  const [sendTransaction] = useSendTransaction();
  const connection = useConnection();
  const wallet = useWallet();
  const tokenInfos = useTokenInfos();
  const tokenList = tokenInfos && new TokenListContainer(tokenInfos);
  const provider = new NotifyingProvider(connection, wallet, sendTransaction);
  return (
    tokenList && (
      <PopupState variant="popover">
        {(popupState) => (
          <div style={{ display: 'flex' }}>
            <Tooltip title="Swap Tokens">
              <IconButton {...bindTrigger(popupState)} size={size}>
                <SwapHoriz />
              </IconButton>
            </Tooltip>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{ style: { borderRadius: '10px' } }}
              disableRestoreFocus
              keepMounted
            >
              <Swap
                provider={provider}
                tokenList={tokenList}
                containerStyle={{ width: '432px' }}
              />
            </Popover>
          </div>
        )}
      </PopupState>
    )
  );
}