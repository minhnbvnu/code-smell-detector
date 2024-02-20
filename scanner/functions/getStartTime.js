function getStartTime(request) {
  let startTime = new Date();
  if (request[requestReceivedStartTime] instanceof Date)
    startTime = request[requestReceivedStartTime];
  else if (typeof request[requestReceivedStartTime] === 'number')
    startTime = new Date(request[requestReceivedStartTime]);
  else if (request[pinoHttpStartTime])
    startTime = new Date(request[pinoHttpStartTime]);
  else if (request._startTime instanceof Date) startTime = request._startTime;
  else if (typeof request._startTime === 'number')
    startTime = new Date(request._startTime);
  return startTime;
}