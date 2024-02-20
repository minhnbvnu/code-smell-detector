async function generateTemplateContent(folderName, framework) {

  let environmentVariables = '';
  if (framework && framework.id === require('./laravel').id) {
    environmentVariables = `
        EnvironmentVariables:
          BOOTSTRAP_FILE: laravel_bootstrap`;
  }

  const templateYmlContent = `ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
  ${folderName}: # service name
    Type: 'Aliyun::Serverless::Service'
    Properties:
      Description: This is FC service
    ${folderName}: # function name
      Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: custom
        CodeUri: ./
        MemorySize: 1024
        InstanceConcurrency: 5
        Timeout: 120
        ${environmentVariables}
      Events:
        httpTrigger:
          Type: HTTP
          Properties:
            AuthType: ANONYMOUS
            Methods: ['GET', 'POST', 'PUT']
  Domain:
    Type: Aliyun::Serverless::CustomDomain
    Properties:
      DomainName: Auto
      Protocol: HTTP
      RouteConfig:
        Routes:
          "/*":
            ServiceName: ${folderName}
            FunctionName: ${folderName}
  `;
  return templateYmlContent;
}