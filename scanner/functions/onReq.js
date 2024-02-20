function onReq(req, res) {
  send(req, swf)
    .root(root)
    .on("error", onError)
    .pipe(res);
}