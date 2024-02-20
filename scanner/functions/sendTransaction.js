async function sendTransaction(
    signaturePromise,
    { onSuccess, onError } = {},
  ) {
    let id = enqueueSnackbar('Sending transaction...', {
      variant: 'info',
      persist: true,
    });
    setSending(true);
    try {
      let signature = await signaturePromise;
      closeSnackbar(id);
      id = enqueueSnackbar('Confirming transaction...', {
        variant: 'info',
        persist: true,
        action: <ViewTransactionOnExplorerButton signature={signature} />,
      });
      await confirmTransaction(connection, signature);
      closeSnackbar(id);
      setSending(false);
      enqueueSnackbar('Transaction confirmed', {
        variant: 'success',
        autoHideDuration: 15000,
        action: <ViewTransactionOnExplorerButton signature={signature} />,
      });
      if (onSuccess) {
        onSuccess(signature);
      }
    } catch (e) {
      closeSnackbar(id);
      setSending(false);
      console.warn(e);
      enqueueSnackbar(e.message, { variant: 'error' });
      if (onError) {
        onError(e);
      }
    }
  }