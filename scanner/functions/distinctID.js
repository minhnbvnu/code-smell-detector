function distinctID() {
  var id = localconfig.get("distinctID");
  if (id === undefined) {
    // use the atom UUID
    id = EDITOR_UUID || crypto.randomBytes(32).toString("hex");
    localconfig.set("distinctID", id);
  }
  return id;
}