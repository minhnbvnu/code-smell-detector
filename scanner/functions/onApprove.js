async function onApprove() {
    popRequest();
    switch (request.method) {
      case 'diffieHellman':
        return diffieHellman(messages[0]);
      case 'signTransaction':
      case 'sign':
        sendSignature(messages[0]);
        break;
      case 'signAllTransactions':
        sendAllSignatures(messages);
        break;
      default:
        throw new Error('Unexpected method: ' + request.method);
    }
  }