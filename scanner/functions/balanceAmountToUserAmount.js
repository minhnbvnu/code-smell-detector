function balanceAmountToUserAmount(balanceAmount, decimals) {
  return (balanceAmount / Math.pow(10, decimals)).toFixed(decimals);
}