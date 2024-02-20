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