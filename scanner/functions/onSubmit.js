async function onSubmit() {
    return sendTransaction(makeTransaction(), { onSuccess: setSignature });
  }