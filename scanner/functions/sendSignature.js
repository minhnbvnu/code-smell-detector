async function sendSignature(message) {
    postMessage({
      result: {
        signature: await wallet.createSignature(message),
        publicKey: wallet.publicKey.toBase58(),
      },
      id: request.id,
    });
  }