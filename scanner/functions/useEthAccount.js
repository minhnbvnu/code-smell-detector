function useEthAccount() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const onChange = (accounts) =>
      setAccount(accounts.length > 0 ? accounts[0] : null);
    window.ethereum.request({ method: 'eth_accounts' }).then(onChange);
    window.ethereum.on('accountsChanged', onChange);
    return () => window.ethereum.removeListener('accountsChanged', onChange);
  }, []);

  return account;
}