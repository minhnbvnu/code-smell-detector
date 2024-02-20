function _writeAction(action) {
  _eventEmitter.emit(action.action, action);

  if (!_enabled) {
    return;
  }

  const data = action.data ? ': ' + JSON.stringify(action.data) : '';
  const fmtTime = new Date(action.tstamp).toLocaleTimeString();

  switch (action.action) {
    case 'startEvent':
      console.log(chalk.dim(
        '[' + fmtTime + '] ' +
        '<START> ' + action.eventName +
        data
      ));
      break;

    case 'endEvent':
      const startAction = _eventStarts[action.eventId];
      const startData = startAction.data ? ': ' + JSON.stringify(startAction.data) : '';
      console.log(chalk.dim(
        '[' + fmtTime + '] ' +
        '<END>   ' + startAction.eventName +
        ' (' + (action.tstamp - startAction.tstamp) + 'ms)' +
        startData
      ));
      delete _eventStarts[action.eventId];
      break;

    default:
      throw new Error('Unexpected scheduled action type: ' + action.action);
  }
}