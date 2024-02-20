function controller(req, res, next) {
  return res.json(req.operationDoc);
}