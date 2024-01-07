function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}