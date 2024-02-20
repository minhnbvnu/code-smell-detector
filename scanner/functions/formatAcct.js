function formatAcct (a) {
  return !(a instanceof Object) ? undefined : {
    balance: a.balance,
    label: a.label,
    index: a.index,
    archived: a.archived,
    extendedPublicKey: a.extendedPublicKey,
    extendedPrivateKey: a.extendedPrivateKey,
    receiveIndex: a.receiveIndex,
    lastUsedReceiveIndex: a.lastUsedReceiveIndex,
    receivingAddressLabels: a.receivingAddressesLabels,
    receiveAddress: a.receiveAddress
  }
}