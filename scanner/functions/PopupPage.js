function PopupPage({ opener }) {
  const origin = useMemo(() => {
    let params = new URLSearchParams(window.location.hash.slice(1));
    return params.get('origin');
  }, []);
  const selectedWallet = useWallet();
  const selectedWalletAddress =
    selectedWallet && selectedWallet.publicKey.toBase58();
  const { accounts, setWalletSelector } = useWalletSelector();
  const [wallet, setWallet] = useState(isExtension ? null : selectedWallet);

  const [connectedAccount, setConnectedAccount] = useState(null);
  const hasConnectedAccount = !!connectedAccount;
  const [requests, setRequests] = useState(getInitialRequests);
  const [autoApprove, setAutoApprove] = useState(false);
  const postMessage = useCallback(
    (message) => {
      if (isExtension) {
        chrome.runtime.sendMessage({
          channel: 'sollet_extension_background_channel',
          data: message,
        });
      } else {
        opener.postMessage({ jsonrpc: '2.0', ...message }, origin);
      }
    },
    [opener, origin],
  );

  // Keep selectedWallet and wallet in sync.
  useEffect(() => {
    if (!isExtension) {
      setWallet(selectedWallet);
    }
    // using stronger condition here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWalletAddress]);

  // (Extension only) Fetch connected wallet for site from local storage.
  useEffect(() => {
    if (isExtension) {
      chrome.storage.local.get('connectedWallets', (result) => {
        const connectedWallet = (result.connectedWallets || {})[origin];
        if (connectedWallet) {
          setWalletSelector(connectedWallet.selector);
          setConnectedAccount(new PublicKey(connectedWallet.publicKey));
          setAutoApprove(connectedWallet.autoApprove);
        } else {
          setConnectedAccount(selectedWallet.publicKey);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin]);

  // (Extension only) Set wallet once connectedWallet is retrieved.
  useEffect(() => {
    if (isExtension && connectedAccount) {
      setWallet(selectedWallet);
    }
    // using stronger condition here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, selectedWalletAddress]);

  // Send a disconnect event if this window is closed, this component is
  // unmounted, or setConnectedAccount(null) is called.
  useEffect(() => {
    if (hasConnectedAccount && !isExtension) {
      function unloadHandler() {
        postMessage({ method: 'disconnected' });
      }
      window.addEventListener('beforeunload', unloadHandler);
      return () => {
        unloadHandler();
        window.removeEventListener('beforeunload', unloadHandler);
      };
    }
  }, [hasConnectedAccount, postMessage, origin]);

  // Disconnect if the user switches to a different wallet.
  useEffect(() => {
    if (
      !isExtension &&
      wallet &&
      connectedAccount &&
      !connectedAccount.equals(wallet.publicKey)
    ) {
      setConnectedAccount(null);
    }
  }, [connectedAccount, wallet]);

  // Push requests from the parent window into a queue.
  useEffect(() => {
    function messageHandler(e) {
      if (e.origin === origin && e.source === window.opener) {
        if (!AUTHORIZED_METHODS.includes(e.data.method)) {
          postMessage({ error: 'Unsupported method', id: e.data.id });
        }

        setRequests((requests) => [...requests, e.data]);
      }
    }
    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [origin, postMessage]);

  const request = requests[0];
  const popRequest = () => setRequests((requests) => requests.slice(1));

  const { messages, messageDisplay } = useMemo(() => {
    if (!request || request.method === 'connect') {
      return { messages: [], messageDisplay: 'tx' };
    }
    switch (request.method) {
      case 'diffieHellman':
        return {
          messages: [request.params.publicKey],
          messageDisplay: 'diffieHellman',
        };
      case 'signTransaction':
        return {
          messages: [bs58.decode(request.params.message)],
          messageDisplay: 'tx',
        };
      case 'signAllTransactions':
        return {
          messages: request.params.messages.map((m) => bs58.decode(m)),
          messageDisplay: 'tx',
        };
      case 'sign':
        if (!(request.params.data instanceof Uint8Array)) {
          throw new Error('Data must be an instance of Uint8Array');
        }
        return {
          messages: [request.params.data],
          messageDisplay: request.params.display === 'utf8' ? 'utf8' : 'hex',
        };
      default:
        throw new Error('Unexpected method: ' + request.method);
    }
  }, [request]);

  if (hasConnectedAccount && requests.length === 0) {
    if (isExtension) {
      window.close();
    } else {
      focusParent();
    }

    return (
      <Typography>
        {isExtension
          ? 'Submitting...'
          : 'Please keep this window open in the background.'}
      </Typography>
    );
  }

  if (!wallet) {
    return <Typography>Loading wallet...</Typography>;
  }

  const mustConnect =
    !connectedAccount || !connectedAccount.equals(wallet.publicKey);
  // We must detect when to show the connection form on the website as it is not sent as a request.
  if (
    (isExtension && request.method === 'connect') ||
    (!isExtension && mustConnect)
  ) {
    // Approve the parent page to connect to this wallet.
    function connect(autoApprove) {
      setConnectedAccount(wallet.publicKey);
      if (isExtension) {
        chrome.storage.local.get('connectedWallets', (result) => {
          // TODO better way to do this
          const account = accounts.find((account) =>
            account.address.equals(wallet.publicKey),
          );
          const connectedWallets = {
            ...(result.connectedWallets || {}),
            [origin]: {
              publicKey: wallet.publicKey.toBase58(),
              selector: account.selector,
              autoApprove,
            },
          };
          chrome.storage.local.set({ connectedWallets });
        });
      }
      postMessage({
        method: 'connected',
        params: { publicKey: wallet.publicKey.toBase58(), autoApprove },
        id: isExtension ? request.id : undefined,
      });
      setAutoApprove(autoApprove);
      if (!isExtension) {
        focusParent();
      } else {
        popRequest();
      }
    }

    return <ApproveConnectionForm origin={origin} onApprove={connect} />;
  }

  assert(AUTHORIZED_METHODS.includes(request.method) && wallet);

  async function onApprove() {
    popRequest();
    switch (request.method) {
      case 'diffieHellman':
        return diffieHellman(messages[0]);
      case 'signTransaction':
      case 'sign':
        sendSignature(messages[0]);
        break;
      case 'signAllTransactions':
        sendAllSignatures(messages);
        break;
      default:
        throw new Error('Unexpected method: ' + request.method);
    }
  }

  async function sendSignature(message) {
    postMessage({
      result: {
        signature: await wallet.createSignature(message),
        publicKey: wallet.publicKey.toBase58(),
      },
      id: request.id,
    });
  }

  async function sendAllSignatures(messages) {
    let signatures;
    // Ledger must sign one by one.
    if (wallet.type === 'ledger') {
      signatures = [];
      for (let k = 0; k < messages.length; k += 1) {
        signatures.push(await wallet.createSignature(messages[k]));
      }
    } else {
      signatures = await Promise.all(
        messages.map((m) => wallet.createSignature(m)),
      );
    }
    postMessage({
      result: {
        signatures,
        publicKey: wallet.publicKey.toBase58(),
      },
      id: request.id,
    });
  }

  function diffieHellman(publicKey) {
    const keys = generateDiffieHelllman(
      publicKey,
      wallet.provider.account.secretKey,
    );
    postMessage({
      result: keys,
      id: request.id,
    });
  }

  function sendReject() {
    popRequest();
    postMessage({
      error: 'Transaction cancelled',
      id: request.id,
    });
  }

  return (
    <ApproveSignatureForm
      key={request.id}
      autoApprove={autoApprove}
      origin={origin}
      messages={messages}
      messageDisplay={messageDisplay}
      onApprove={onApprove}
      onReject={sendReject}
    />
  );
}