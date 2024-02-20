async function sessionVariablesSet(conn) {
  await sessionVariableSet(conn, 'SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await sessionVariableSet(conn, 'SET SESSION explicit_defaults_for_timestamp=ON');
}