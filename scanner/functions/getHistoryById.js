function getHistoryById(historyId) {
    return (historyId ? viewHistory.histories[ historyId ] : null);
  }