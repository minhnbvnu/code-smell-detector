function rejectDeployments(req, res) {
  res.status(403)
     .set('Content-Type', 'text/plain')
     .end('Forbidden: Server is not accepting deployments');
}