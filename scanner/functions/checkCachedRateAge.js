function checkCachedRateAge(rate) {
    const expiryDate = Math.floor(Date.now() / 1000) - 3600;
    return rate.timestamp < expiryDate ? fetchLiveRate() : rate;
  }