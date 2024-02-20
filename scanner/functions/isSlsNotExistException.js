function isSlsNotExistException(e) {
  return e.code === 'InvalidArgument'
    && _.includes(e.message, 'not exist')
    && (_.includes(e.message, 'logstore') || _.includes(e.message, 'project'));
}