async function getTmpDomainExpiredTime(domainName) {
  const expiredTimeRs = await sendHttpRequest('POST', TMP_DOMAIN_EXPIRED_TIME_URL, { domain: domainName });

  const expiredTime = expiredTimeRs.expired_time;
  const timesLimit = expiredTimeRs.times_limit;
  const expiredTimeObj = new Date(expiredTime * 1000);

  return {
    expiredTime, // unix timestamp(m)
    timesLimit,
    expiredTimeObj
  };
}