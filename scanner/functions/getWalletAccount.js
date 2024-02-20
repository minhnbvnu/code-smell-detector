function getWalletAccount (hdwallet, account) {
  if (hdwallet.isValidAccountIndex(parseInt(account))) {
    var filtered = hdwallet.accounts.filter(byProp('index', parseInt(account)))
    if (filtered.length === 0) throw 'ERR_ACCT_IDX'
    return filtered[0]
  } else if (typeof account === 'string' && account.slice(0, 4) === 'xpub') {
    return hdwallet.account(account)
  } else {
    throw 'ERR_ACCT_IDX'
  }
}