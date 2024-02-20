function diffieHellman(publicKey) {
    const keys = generateDiffieHelllman(
      publicKey,
      wallet.provider.account.secretKey,
    );
    postMessage({
      result: keys,
      id: request.id,
    });
  }