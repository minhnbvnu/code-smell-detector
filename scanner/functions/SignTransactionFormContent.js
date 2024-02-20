function SignTransactionFormContent({
  origin,
  messages,
  onApprove,
  autoApprove,
  buttonRef,
}) {
  const explorerUrlSuffix = useSolanaExplorerUrlSuffix();
  const connection = useConnection();
  const wallet = useWallet();
  const [publicKeys] = useWalletPublicKeys();

  const [parsing, setParsing] = useState(true);
  // An array of arrays, where each element is the set of instructions for a
  // single transaction.
  const [txInstructions, setTxInstructions] = useState(null);

  const isMultiTx = messages.length > 1;

  useEffect(() => {
    Promise.all(messages.map((m) => decodeMessage(connection, wallet, m))).then(
      (txInstructions) => {
        setTxInstructions(txInstructions);
        setParsing(false);
      },
    );
  }, [messages, connection, wallet]);

  const validator = useMemo(() => {
    return {
      safe:
        publicKeys &&
        txInstructions &&
        isSafeInstruction(publicKeys, wallet.publicKey, txInstructions),
    };
  }, [publicKeys, txInstructions, wallet]);

  useEffect(() => {
    if (validator.safe && autoApprove) {
      console.log('Auto approving safe transaction');
      onApprove();
    } else {
      // brings window to front when we receive new instructions
      // this needs to be executed from wallet instead of adapter
      // to ensure chrome brings window to front
      window.focus();

      // Scroll to approve button and focus it to enable approve with enter.
      // Keep currentButtonRef in local variable, so the reference can't become
      // invalid until the timeout is over. this was happening to all auto-
      // approvals for unknown reasons.
      let currentButtonRef = buttonRef.current;
      if (currentButtonRef) {
        currentButtonRef.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => currentButtonRef.focus(), 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validator, autoApprove, buttonRef]);

  const onOpenAddress = (address) => {
    address &&
      window.open(
        'https://solscan.io/account/' + address + explorerUrlSuffix,
        '_blank',
      );
  };

  const getContent = (instruction) => {
    switch (instruction?.type) {
      case 'cancelOrder':
      case 'cancelOrderV2':
      case 'matchOrders':
      case 'settleFunds':
        return (
          <DexInstruction
            instruction={instruction}
            onOpenAddress={onOpenAddress}
          />
        );
      case 'closeAccount':
      case 'initializeAccount':
      case 'transfer':
      case 'approve':
      case 'revoke':
      case 'mintTo':
        return (
          <TokenInstruction
            instruction={instruction}
            onOpenAddress={onOpenAddress}
          />
        );
      case 'systemCreateWithSeed':
      case 'systemCreate':
      case 'systemTransfer':
        return (
          <SystemInstruction
            instruction={instruction}
            onOpenAddress={onOpenAddress}
          />
        );
      case 'stakeAuthorizeWithSeed':
      case 'stakeAuthorize':
      case 'stakeDeactivate':
      case 'stakeDelegate':
      case 'stakeInitialize':
      case 'stakeSplit':
      case 'stakeWithdraw':
        return (
          <StakeInstruction
            instruction={instruction}
            onOpenAddress={onOpenAddress}
          />
        );
      case 'newOrder':
        return (
          <NewOrder instruction={instruction} onOpenAddress={onOpenAddress} />
        );
      case 'newOrderV3':
        return (
          <NewOrder
            instruction={instruction}
            onOpenAddress={onOpenAddress}
            v3={true}
          />
        );
      default:
        return (
          <UnknownInstruction
            instruction={instruction}
            onOpenAddress={onOpenAddress}
          />
        );
    }
  };

  const txLabel = (idx) => {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Transaction {idx.toString()}
        </Typography>
        <Divider style={{ marginTop: 20 }} />
      </>
    );
  };

  const txListItem = (instructions, txIdx) => {
    const ixs = instructions.map((instruction, i) => (
      <Box style={{ marginTop: 20 }} key={i}>
        {getContent(instruction)}
        <Divider style={{ marginTop: 20 }} />
      </Box>
    ));

    if (!isMultiTx) {
      return ixs;
    }

    return (
      <Box style={{ marginTop: 20 }} key={txIdx}>
        {txLabel(txIdx)}
        {ixs}
      </Box>
    );
  };

  return (
    <CardContent>
      {parsing ? (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              marginBottom: 20,
            }}
          >
            <CircularProgress style={{ marginRight: 20 }} />
            <Typography
              variant="subtitle1"
              style={{ fontWeight: 'bold' }}
              gutterBottom
            >
              Parsing transaction{isMultiTx > 0 ? 's' : ''}:
            </Typography>
          </div>
          {messages.map((message, idx) => (
            <Typography key={idx} style={{ wordBreak: 'break-all' }}>
              {bs58.encode(message)}
            </Typography>
          ))}
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            {txInstructions
              ? `${origin} wants to:`
              : `Unknown transaction data`}
          </Typography>
          {txInstructions ? (
            txInstructions.map((instructions, txIdx) =>
              txListItem(instructions, txIdx),
            )
          ) : (
            <>
              <Typography
                variant="subtitle1"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                Unknown transaction{isMultiTx > 0 ? 's' : ''}:
              </Typography>
              {messages.map((message) => (
                <Typography style={{ wordBreak: 'break-all' }}>
                  {bs58.encode(message)}
                </Typography>
              ))}
            </>
          )}
        </>
      )}
    </CardContent>
  );
}