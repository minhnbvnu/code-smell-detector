function urlFromArgs(args) {
  const extraArgs = isLive(args) ? 'session_type=live' : `log=${args.log}`;
  const url = `${args.host}?version=2.0&${extraArgs}`;

  return url;
}