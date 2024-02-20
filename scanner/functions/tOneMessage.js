function tOneMessage(t, method, regexp, mode, msg) {
  const {dump, log} = getMiddleware(mode);

  const func = dump[method];

  const args = [];

  if (msg) {
    args.push(msg);
  }

  func.apply(dump, args);

  t.equals(1, log.length, 'Should only have one message');

  t.ok(regexp.test(log[0]), `Regex ${regexp} matches message "${log[0]}"`);
}