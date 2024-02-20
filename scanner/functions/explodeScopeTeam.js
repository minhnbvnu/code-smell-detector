function explodeScopeTeam(arg, requireTeam, reporter) {
  var _arg$split = arg.split(':');

  const scope = _arg$split[0],
        team = _arg$split[1],
        parts = _arg$split.slice(2);

  if (parts.length) {
    return false;
  }

  if (requireTeam && !team) {
    return false;
  }

  return {
    scope: scope || '',
    team: team || '',
    user: ''
  };
}