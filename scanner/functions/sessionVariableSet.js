async function sessionVariableSet(conn, sql) {
  try {
    await conn.query(sql);
    return true;
  } catch (error) {
    return false;
  }
}