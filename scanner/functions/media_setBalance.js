function media_setBalance(balance) {
  balance = clamp(balance, -100, 100); // The balance clips to the center

  if (Math.abs(balance) < 25) {
    balance = 0;
  }

  return {
    type: SET_BALANCE,
    balance
  };
}