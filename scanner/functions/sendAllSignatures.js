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