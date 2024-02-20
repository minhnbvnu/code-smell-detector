function closeConnection(req) {
  req._rdbConn.close();
}