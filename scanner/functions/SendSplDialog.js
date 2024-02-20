function SendSplDialog({ onClose, publicKey, balanceInfo, onSubmitRef }) {
  const defaultAddressHelperText =
    !balanceInfo.mint || balanceInfo.mint.equals(WRAPPED_SOL_MINT)
      ? 'Enter Solana Address'
      : 'Enter SPL token or Solana address';
  const wallet = useWallet();
  const [sendTransaction, sending] = useSendTransaction();
  const [addressHelperText, setAddressHelperText] = useState(
    defaultAddressHelperText,
  );
  const [passValidation, setPassValidation] = useState();
  const [overrideDestinationCheck, setOverrideDestinationCheck] = useState(
    false,
  );
  const [shouldShowOverride, setShouldShowOverride] = useState();
  let {
    fields,
    destinationAddress,
    transferAmountString,
    validAmount,
  } = useForm(balanceInfo, addressHelperText, passValidation);
  const { decimals, mint } = balanceInfo;
  const mintString = mint && mint.toBase58();
  const [isDomainName, setIsDomainName] = useState(false);
  const [domainOwner, setDomainOwner] = useState();

  useEffect(() => {
    (async () => {
      if (destinationAddress.startsWith('@')) {
        const twitterOwner = await resolveTwitterHandle(
          wallet.connection,
          destinationAddress.slice(1),
        );
        if (!twitterOwner) {
          setAddressHelperText(`This Twitter handle is not registered`);
          setPassValidation(undefined);
          setShouldShowOverride(undefined);
          return;
        }
        setIsDomainName(true);
        setDomainOwner(twitterOwner);
      }
      if (destinationAddress.endsWith('.sol')) {
        const name = destinationAddress.slice(0, -4);
        const hasSub = name.split('.').length === 2;

        let domainOwner;

        if (hasSub) {
          const sub = name.split('.')[0];
          const parentKey = await getNameKey(name.split('.')[1]);
          domainOwner = await resolveDomainName(
            wallet.connection,
            sub,
            parentKey,
          );
        } else {
          domainOwner = await resolveDomainName(wallet.connection, name);
        }

        if (!domainOwner) {
          setAddressHelperText(
            `This ${hasSub ? 'subdomain' : 'domain'} name is not registered`,
          );
          setPassValidation(undefined);
          setShouldShowOverride(undefined);
          return;
        }
        setIsDomainName(true);
        setDomainOwner(domainOwner);
      }
      if (!destinationAddress) {
        setAddressHelperText(defaultAddressHelperText);
        setPassValidation(undefined);
        setShouldShowOverride(undefined);
        return;
      }
      try {
        const destinationAccountInfo = await wallet.connection.getAccountInfo(
          new PublicKey(isDomainName ? domainOwner : destinationAddress),
        );
        setShouldShowOverride(false);

        if (destinationAccountInfo.owner.equals(TOKEN_PROGRAM_ID)) {
          const accountInfo = parseTokenAccountData(
            destinationAccountInfo.data,
          );
          if (accountInfo.mint.toBase58() === mintString) {
            setPassValidation(true);
            setAddressHelperText('Address is a valid SPL token address');
          } else {
            setPassValidation(false);
            setAddressHelperText('Destination address mint does not match');
          }
        } else {
          setPassValidation(true);
          setAddressHelperText(
            `Destination is a Solana address: ${
              isDomainName ? domainOwner : destinationAddress
            }`,
          );
        }
      } catch (e) {
        console.log(`Received error validating address ${e}`);
        setAddressHelperText(defaultAddressHelperText);
        setShouldShowOverride(true);
        setPassValidation(undefined);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationAddress, wallet, mintString, isDomainName, domainOwner]);
  useEffect(() => {
    return () => {
      setOverrideDestinationCheck(false);
    };
  }, [setOverrideDestinationCheck]);
  async function makeTransaction() {
    let amount = Math.round(parseFloat(transferAmountString) * 10 ** decimals);
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }
    return wallet.transferToken(
      publicKey,
      new PublicKey(isDomainName ? domainOwner : destinationAddress),
      amount,
      balanceInfo.mint,
      decimals,
      null,
      overrideDestinationCheck,
    );
  }

  const disabled = shouldShowOverride
    ? !overrideDestinationCheck || sending || !validAmount
    : sending || !validAmount;

  async function onSubmit() {
    return sendTransaction(makeTransaction(), { onSuccess: onClose });
  }
  onSubmitRef.current = onSubmit;
  return (
    <>
      <DialogContent>{fields}</DialogContent>
      <DialogActions>
        {shouldShowOverride && (
          <div
            style={{
              'align-items': 'center',
              display: 'flex',
              'text-align': 'left',
            }}
          >
            <b>This address has no funds. Are you sure it's correct?</b>
            <Switch
              checked={overrideDestinationCheck}
              onChange={(e) => setOverrideDestinationCheck(e.target.checked)}
              color="primary"
            />
          </div>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={disabled}>
          Send
        </Button>
      </DialogActions>
    </>
  );
}