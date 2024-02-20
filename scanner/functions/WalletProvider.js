function WalletProvider({ children }) {
  useListener(walletSeedChanged, 'change');
  const [{
    mnemonic,
    seed,
    importsEncryptionKey,
    derivationPath,
  }] = useUnlockedMnemonicAndSeed();
  const { enqueueSnackbar } = useSnackbar();
  const connection = useConnection();
  const [wallet, setWallet] = useState();

  // `privateKeyImports` are accounts imported *in addition* to HD wallets
  const [privateKeyImports, setPrivateKeyImports] = useLocalStorageState(
    'walletPrivateKeyImports',
    {},
  );
  // `walletSelector` identifies which wallet to use.
  let [walletSelector, setWalletSelector] = useLocalStorageState(
    'walletSelector',
    DEFAULT_WALLET_SELECTOR,
  );
  const [_hardwareWalletAccount, setHardwareWalletAccount] = useState(null);

  // `walletCount` is the number of HD wallets.
  const [walletCount, setWalletCount] = useLocalStorageState('walletCount', 1);

  if (walletSelector.ledger && !_hardwareWalletAccount) {
    walletSelector = DEFAULT_WALLET_SELECTOR;
    setWalletSelector(DEFAULT_WALLET_SELECTOR);
  }

  useEffect(() => {
    (async () => {
      if (!seed) {
        return null;
      }
      let wallet;
      if (walletSelector.ledger) {
        try {
          const onDisconnect = () => {
            setWalletSelector(DEFAULT_WALLET_SELECTOR);
            setHardwareWalletAccount(null);
          };
          const args = {
            onDisconnect,
            derivationPath: walletSelector.derivationPath,
            account: walletSelector.account,
            change: walletSelector.change,
          };
          wallet = await Wallet.create(connection, 'ledger', args);
        } catch (e) {
          console.log(`received error using ledger wallet: ${e}`);
          let message = 'Received error unlocking ledger';
          if (e.statusCode) {
            message += `: ${e.statusCode}`;
          }
          enqueueSnackbar(message, { variant: 'error' });
          setWalletSelector(DEFAULT_WALLET_SELECTOR);
          setHardwareWalletAccount(null);
          return;
        }
      }
      if (!wallet) {
        const account =
          walletSelector.walletIndex !== undefined
            ? getAccountFromSeed(
                Buffer.from(seed, 'hex'),
                walletSelector.walletIndex,
                derivationPath,
              )
            : new Account(
                (() => {
                  const { nonce, ciphertext } = privateKeyImports[
                    walletSelector.importedPubkey
                  ];
                  return nacl.secretbox.open(
                    bs58.decode(ciphertext),
                    bs58.decode(nonce),
                    importsEncryptionKey,
                  );
                })(),
              );
        wallet = await Wallet.create(connection, 'local', { account });
      }
      setWallet(wallet);
    })();
  }, [
    connection,
    seed,
    walletSelector,
    privateKeyImports,
    importsEncryptionKey,
    setWalletSelector,
    enqueueSnackbar,
    derivationPath,
  ]);
  function addAccount({ name, importedAccount, ledger }) {
    if (importedAccount === undefined) {
      name && localStorage.setItem(`name${walletCount}`, name);
      setWalletCount(walletCount + 1);
    } else {
      const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
      const plaintext = importedAccount.secretKey;
      const ciphertext = nacl.secretbox(plaintext, nonce, importsEncryptionKey);
      // `useLocalStorageState` requires a new object.
      let newPrivateKeyImports = { ...privateKeyImports };
      newPrivateKeyImports[importedAccount.publicKey.toString()] = {
        name,
        ciphertext: bs58.encode(ciphertext),
        nonce: bs58.encode(nonce),
      };
      setPrivateKeyImports(newPrivateKeyImports);
    }
  }

  const getWalletNames = () => {
    return JSON.stringify(
      [...Array(walletCount).keys()].map((idx) =>
        localStorage.getItem(`name${idx}`),
      ),
    );
  };
  const [walletNames, setWalletNames] = useState(getWalletNames());
  function setAccountName(selector, newName) {
    if (selector.importedPubkey && !selector.ledger) {
      let newPrivateKeyImports = { ...privateKeyImports };
      newPrivateKeyImports[selector.importedPubkey.toString()].name = newName;
      setPrivateKeyImports(newPrivateKeyImports);
    } else {
      localStorage.setItem(`name${selector.walletIndex}`, newName);
      setWalletNames(getWalletNames());
    }
  }

  const [accounts, derivedAccounts] = useMemo(() => {
    if (!seed) {
      return [[], []];
    }

    const seedBuffer = Buffer.from(seed, 'hex');
    const derivedAccounts = [...Array(walletCount).keys()].map((idx) => {
      let address = getAccountFromSeed(seedBuffer, idx, derivationPath)
        .publicKey;
      let name = localStorage.getItem(`name${idx}`);
      return {
        selector: {
          walletIndex: idx,
          importedPubkey: undefined,
          ledger: false,
        },
        isSelected: walletSelector.walletIndex === idx,
        address,
        name: idx === 0 ? 'Main account' : name || `Account ${idx}`,
      };
    });

    const importedAccounts = Object.keys(privateKeyImports).map((pubkey) => {
      const { name } = privateKeyImports[pubkey];
      return {
        selector: {
          walletIndex: undefined,
          importedPubkey: pubkey,
          ledger: false,
        },
        address: new PublicKey(bs58.decode(pubkey)),
        name: `${name} (imported)`, // TODO: do this in the Component with styling.
        isSelected: walletSelector.importedPubkey === pubkey,
      };
    });

    const accounts = derivedAccounts.concat(importedAccounts);
    return [accounts, derivedAccounts];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, walletCount, walletSelector, privateKeyImports, walletNames]);

  let hardwareWalletAccount;
  if (_hardwareWalletAccount) {
    hardwareWalletAccount = {
      ..._hardwareWalletAccount,
      selector: {
        walletIndex: undefined,
        ledger: true,
        importedPubkey: _hardwareWalletAccount.publicKey,
        derivationPath: _hardwareWalletAccount.derivationPath,
        account: _hardwareWalletAccount.account,
        change: _hardwareWalletAccount.change,
      },
      address: _hardwareWalletAccount.publicKey,
      isSelected: walletSelector.ledger,
    };
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        seed,
        mnemonic,
        importsEncryptionKey,
        walletSelector,
        setWalletSelector,
        privateKeyImports,
        setPrivateKeyImports,
        accounts,
        derivedAccounts,
        addAccount,
        setAccountName,
        derivationPath,
        hardwareWalletAccount,
        setHardwareWalletAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}