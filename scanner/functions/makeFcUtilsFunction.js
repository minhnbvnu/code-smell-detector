async function makeFcUtilsFunction({
  serviceName,
  functionName,
  codes,
  description = '',
  handler,
  timeout = 60,
  memorySize = 128,
  runtime = 'nodejs8'
}) {
  const fc = await getFcClient();

  var fn;
  try {
    fn = await fc.getFunction(serviceName, functionName);
  } catch (ex) {
    if (ex.code !== 'FunctionNotFound') {
      throw ex;
    }
  }

  const base64 = await zip.packFromJson(codes);

  let code = {
    zipFile: base64
  };

  const params = {
    description,
    handler,
    initializer: '',
    timeout,
    memorySize,
    runtime,
    code
  };

  if (!fn) {
    // create
    params['functionName'] = functionName;
    fn = await fc.createFunction(serviceName, params);
  } else {
    // update
    fn = await fc.updateFunction(serviceName, functionName, params);
  }

  return fn;
}