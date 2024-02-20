function updateLastSyncedBalance(accounts) {
  accounts.forEach(account => {
    localStorage.setItem(account.id, JSON.stringify(account.balance));
  });
}