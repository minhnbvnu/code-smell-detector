async function makeFcUtilsFunctionNasDirChecker(role, vpcConfig, nasConfig) {
  await makeFcUtilsService(role, vpcConfig, nasConfig);

  const functionName = 'nas_dir_checker';

  const functionCode = await getFcUtilsFunctionCode('nas-dir-check.js');

  const codes = {
    'index.js': functionCode
  };

  await makeFcUtilsFunction({
    serviceName: FUN_GENERATED_SERVICE,
    functionName: 'nas_dir_checker',
    codes,
    description: 'used for fun to ensure nas remote dir exist',
    handler: 'index.handler'
  });

  return functionName;
}