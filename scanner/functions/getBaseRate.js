function getBaseRate() {
    return fetchCachedRate()
      .then(rate => rate, error => fetchLiveRate())
      .then(checkCachedRateAge)
      .then(convertRate);
  }