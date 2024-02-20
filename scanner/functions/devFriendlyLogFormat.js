function devFriendlyLogFormat(options) {
  const { req, res, ctx } = options;

  const statusColor =
    res.statusCode >= 500
      ? 'red'
      : res.statusCode >= 400
      ? 'yellow'
      : res.statusCode >= 300
      ? 'cyan'
      : res.statusCode >= 200
      ? 'green'
      : 'white';

  let responseTime = '-';

  const responseTimeHeader = res.getHeader('x-response-time');
  if (responseTimeHeader) {
    const milliseconds = ms(responseTimeHeader);
    const responseColor =
      milliseconds >= 1000
        ? 'red'
        : milliseconds >= 500
        ? 'magenta'
        : milliseconds >= 250
        ? 'yellow'
        : milliseconds >= 100
        ? 'cyan'
        : 'green';
    responseTime = c[responseColor](`${milliseconds} ms`);
  }

  return [
    ctx ? ctx.ip : req.ip,
    req.method,
    req.url,
    `HTTP/${req.httpVersionMajor}.${req.httpVersionMinor}`,
    c[statusColor](res.statusCode),
    res.getHeader('content-length') || '-',
    '-',
    responseTime
  ].join(' ');
}