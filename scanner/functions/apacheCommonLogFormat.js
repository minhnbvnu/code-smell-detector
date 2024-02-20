function apacheCommonLogFormat(options) {
  const { req, res, ctx } = options;

  const startTime = getStartTime(req);

  return `${ctx ? ctx.ip : req.ip} - ${clfDate(startTime)} "${req.method} ${
    req.url
  } HTTP/${req.httpVersionMajor}.${req.httpVersionMinor}" ${res.statusCode} ${
    res.getHeader('content-length') || '-'
  }`;
}