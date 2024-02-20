function getMethodArg (method) {
  var methodArg = '',
    supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    flag = false;

  _.forEach(supportedMethods, (value) => {
    if (value === method) {
      flag = true;
    }
  });

  if (flag) {
    methodArg = '`' + method;
  }
  else {
    methodArg = `(Code.method_of_string "${method}")`;
  }
  return methodArg;
}