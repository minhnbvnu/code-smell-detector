function isUpgradeRequired (body) {
  return body.status === 'Failure' &&
    body.code === 400 &&
    body.message === 'Upgrade request required'
}