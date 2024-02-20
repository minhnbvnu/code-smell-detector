async function onConnection(conn) {
  await sessionVariablesSet(conn);
}