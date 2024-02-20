function keyForRemote(remote) {
  return remote.resolved || (remote.reference && remote.hash ? `${remote.reference}#${remote.hash}` : null);
}