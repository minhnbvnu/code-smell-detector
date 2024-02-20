function ConnectToMetamaskButton() {
  const callAsync = useCallAsync();

  if (!window.ethereum) {
    return (
      <Button
        color="primary"
        variant="outlined"
        component="a"
        href={isExtension ? 'https://sollet.io' : 'https://metamask.io/'}
        target="_blank"
        rel="noopener"
      >
        {isExtension ? 'Open sollet.io' : 'Connect to MetaMask'}
      </Button>
    );
  }

  function connect() {
    callAsync(
      window.ethereum.request({
        method: 'eth_requestAccounts',
      }),
      {
        progressMessage: 'Connecting to MetaMask...',
        successMessage: 'Connected to MetaMask',
      },
    );
  }

  return (
    <Button color="primary" variant="outlined" onClick={connect}>
      Connect to MetaMask
    </Button>
  );
}