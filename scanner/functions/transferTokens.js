async function transferTokens({
  connection,
  owner,
  sourcePublicKey,
  destinationPublicKey,
  amount,
  memo,
  mint,
  decimals,
  overrideDestinationCheck,
}) {
  let destinationAccountInfo = await connection.getAccountInfo(
    destinationPublicKey,
  );
  if (
    !!destinationAccountInfo &&
    destinationAccountInfo.owner.equals(TOKEN_PROGRAM_ID)
  ) {
    return await transferBetweenSplTokenAccounts({
      connection,
      owner,
      mint,
      decimals,
      sourcePublicKey,
      destinationPublicKey,
      amount,
      memo,
    });
  }

  if (
    (!destinationAccountInfo || destinationAccountInfo.lamports === 0) &&
    !overrideDestinationCheck
  ) {
    throw new Error('Cannot send to address with zero SOL balances');
  }

  const destinationAssociatedTokenAddress = await findAssociatedTokenAddress(
    destinationPublicKey,
    mint,
  );
  destinationAccountInfo = await connection.getAccountInfo(
    destinationAssociatedTokenAddress,
  );
  if (
    !!destinationAccountInfo &&
    destinationAccountInfo.owner.equals(TOKEN_PROGRAM_ID)
  ) {
    return await transferBetweenSplTokenAccounts({
      connection,
      owner,
      mint,
      decimals,
      sourcePublicKey,
      destinationPublicKey: destinationAssociatedTokenAddress,
      amount,
      memo,
    });
  }
  return await createAndTransferToAccount({
    connection,
    owner,
    sourcePublicKey,
    destinationPublicKey,
    amount,
    memo,
    mint,
    decimals,
  });
}