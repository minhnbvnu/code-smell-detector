function moduleThrewError(id) {
  return Error('Requiring module "' + id + '", which threw an exception.');
}