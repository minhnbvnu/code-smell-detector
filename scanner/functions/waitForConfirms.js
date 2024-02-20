function waitForConfirms(tx, onStatusChange) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    tx.on('confirmation', (confirms, receipt) => {
      if (!resolved) {
        onStatusChange({ confirms: confirms + 1 });
        if (!receipt.status) {
          reject('Transaction failed');
          resolved = true;
        } else if (confirms >= 11) {
          resolve();
          resolved = true;
        }
      }
    });
  });
}