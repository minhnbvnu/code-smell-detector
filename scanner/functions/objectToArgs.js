function objectToArgs(argo) {
  var s = argo.other.slice();
  if (argo.arch) s.push("-a", argo.arch);
  if (argo.version) s.push("-v", argo.version);
  if (argo.loglevel) s.push("-l", argo.loglevel);
  return s;
}