async function requestUntilServerUp(opts, timeout) {
  var serverEstablished = false;
  // 重试请求间的间隔时间，单位 ms
  const intervalPerReq = 500;
  var retryTimes = (timeout * 1000) / intervalPerReq;
  var resp = {};
  while (!serverEstablished) {
    try {
      resp = await rp(opts);
      serverEstablished = true;
    } catch (error) {
      if ((error.message.indexOf('socket hang up') !== -1 || !error.response) && retryTimes >= 0) {
        retryTimes--;
        await sleep(500);
        continue;
      } else {
        if (retryTimes < 0) {
          console.log(red(`Retry request to container for ${timeout}s, please make your function timeout longer`));
        }
        if (error.response && error.response.statusCode) {
          resp = {
            statusCode: error.response.statusCode, 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: {
              'errorMessage': error.message
            }
          };
        } else {
          console.log(red(`Fun Error: ${error}`));
          resp = {
            statusCode: 500, 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: {
              'errorMessage': error.message
            }
          };
        }
        break;
      }
    }
  }
  return resp;
}