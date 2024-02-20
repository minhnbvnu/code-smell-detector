function appendProjectInfo (req, res, next) {
  let path = req.path
  if (_.startsWith(path, '/project')) {
    let projectId = parseInt(_.get(path.split('/'), [2], 0))
    _.set(req, ['fee', 'project', 'projectId'], projectId)
  }
  next()
}