function rechargeHistoryLoaded (list) {
  return {
    type: LOAD_RECHARGE_HISTORY_SUCCESS,
    payload: {
      list
    }
  }
}