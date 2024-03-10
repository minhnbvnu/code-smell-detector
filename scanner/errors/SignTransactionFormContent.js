    // eslint-disable-next-line react-hooks/exhaustive-deps
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