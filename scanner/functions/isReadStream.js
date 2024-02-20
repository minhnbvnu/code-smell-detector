function isReadStream (rs) {
  return rs.readable && rs.path && rs.mode
}