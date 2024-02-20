function filterFunctionResponseAndExecutionInfo(response) {
  let responseBegin = false;
  let executionInfoBegin = false;

  const httpResponse = [];
  let executionInfo = '';

  debug('response is');
  for (let line of response) {
    debug(line);
    if (line.startsWith('--------------------response begin-----------------')) {
      responseBegin = true;
      continue;
    } else if (line.startsWith('--------------------response end-----------------')) {
      responseBegin = false;
      continue;
    } else if (line.startsWith('--------------------execution info begin-----------------')) {
      executionInfoBegin = true;
      continue;
    } else if (line.startsWith('--------------------execution info end-----------------')) {
      executionInfoBegin = false;
      continue;
    }

    if (responseBegin) {
      httpResponse.push(line);
    } else if (executionInfoBegin) {
      executionInfo = line;
    } else {
      console.log(line);
    }
  }

  return [httpResponse, executionInfo];
}