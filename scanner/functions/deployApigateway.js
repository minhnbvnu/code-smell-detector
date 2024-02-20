async function deployApigateway(name, { apiDefinition, template, tplPath }) {
  const swaggerContent = await getSwagger(apiDefinition, tplPath);

  if (swaggerContent) {
    for (const [k, v] of Object.entries(swaggerContent)) {
      if (!['openapi', 'info', 'components'].includes(k)) {

        const apiGroup = await makeGroup({
          name,
          description: `api group for function compute`
        });
        for (const [method, methodDefinition] of Object.entries(v)) {
          const fcDefinition = methodDefinition['x-aliyun-apigateway-fc'];

          let roleName;
          if (fcDefinition.role) {
            roleName = extractFcRole(fcDefinition.role);
          } else {
            roleName = `AliyunFcGeneratedApiGatewayRole`;
          }

          const role = await makeRole(roleName, true, 'API Gateway access FunctionCompute', {
            'Statement': [{
              'Action': 'sts:AssumeRole',
              'Effect': 'Allow',
              'Principal': {
                'Service': [
                  'apigateway.aliyuncs.com'
                ]
              }
            }],
            'Version': '1'
          });

          const policyName = 'AliyunFCInvocationAccess';
          await attachPolicyToRole(policyName, roleName);

          debug('%j', role);

          const apiName = methodDefinition['x-aliyun-apigateway-api-name'] || `${k.replace(/^\//, '').replace(/(\[|\])/g, '').replace(/\//g, '_')}_${method}`;

          const { serviceName, functionName } = extractFcArn(fcDefinition.arn);

          const serviceTimeout = fcDefinition.timeout || 3000;

          const resultConfig = {
            resultType: methodDefinition['x-aliyun-apigateway-result-type'],
            resultSample: methodDefinition['x-aliyun-apigateway-result-sample'],
            failResultSample: methodDefinition['x-aliyun-apigateway-fail-result-sample']
          };

          const requestConfig = methodDefinition['x-aliyun-apigateway-request-config'] || {};

          let openIdConnectConfig = methodDefinition['x-aliyun-apigateway-open-id-connect-config'];
          if (!openIdConnectConfig) {
            openIdConnectConfig = methodDefinition['x-aliyun-apigateway-openid-connect-config'];
          }

          const requestParameters = methodDefinition['x-aliyun-apigateway-request-parameters'];
          const serviceParameters = methodDefinition['x-aliyun-apigateway-service-parameters'];
          const serviceParametersMap = methodDefinition['x-aliyun-apigateway-service-parameters-map'];

          await makeApi(apiGroup, {
            stageName: apiDefinition.Properties.StageName,
            requestPath: k,
            method,
            roleArn: role.Role.Arn,
            apiName,
            serviceName,
            functionName,
            serviceTimeout,
            requestParameters,
            serviceParameters,
            serviceParametersMap,
            auth: {
              type: methodDefinition['x-aliyun-apigateway-auth-type'],
              config: openIdConnectConfig
            },
            visibility: methodDefinition['x-aliyun-apigateway-visibility'],
            requestConfig,
            resultConfig,
            description: methodDefinition['x-aliyun-apigateway-description'],
            forceNonceCheck: methodDefinition['x-aliyun-apigateway-force-nonce-check'],
            appCodeAuthType: methodDefinition['x-aliyun-apigateway-app-code-auth-type'],
            allowSignatureMethod: methodDefinition['x-aliyun-apigateway-allow-signature-method'],
            disableInternet: methodDefinition['x-aliyun-apigateway-disable-internet'],
            webSocketApiType: methodDefinition['x-aliyun-apigateway-websocket-api-type'],
            errorCodeSamples: methodDefinition['x-aliyun-apigateway-error-code-sample']
          });
        }
      }
    }
  }
}