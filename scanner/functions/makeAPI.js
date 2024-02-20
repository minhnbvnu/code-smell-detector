async function makeAPI(ag, group, conf, role) {
  const apiName = conf.name;
  const [fcRegion, serviceName, functionName] = conf['function'].split('/');
  const groupId = group.GroupId;
  const result = await ag.describeApis({
    ApiName: apiName,
    GroupId: groupId
  });
  var api = result.ApiSummarys && result.ApiSummarys.ApiSummary[0];

  const method = conf.method || 'GET';
  const parameters = conf.parameters || [];
  const requestParameters = parameters.map((item) => {
    return {
      ApiParameterName: item.name,
      Location: item.location || 'Query',
      ParameterType: item.type || 'String',
      Required: item.required
    };
  });
  const serviceParameters = parameters.map((item) => {
    return {
      ServiceParameterName: item.name,
      Location: item.location || 'Query',
      Type: item.type || 'String',
      ParameterCatalog: 'REQUEST'
    };
  });
  const serviceParametersMap = parameters.map((item) => {
    return {
      ServiceParameterName: item.name,
      RequestParameterName: item.name
    };
  });

  var params = {
    GroupId: groupId,
    ApiName: apiName,
    Visibility: conf.visibility || 'PUBLIC',
    Description: conf.description || 'The awesome api',
    AuthType: conf.auth_type || 'ANONYMOUS',
    RequestConfig: JSON.stringify({
      'RequestHttpMethod': method,
      'RequestProtocol': conf.requestProtocol || 'HTTP',
      'BodyFormat': conf.body_format || '',
      'PostBodyDescription': '',
      'RequestPath': conf.path
    }),
    RequestParameters: JSON.stringify(requestParameters),
    ServiceParameters: JSON.stringify(serviceParameters),
    ServiceParametersMap: JSON.stringify(serviceParametersMap),
    ServiceConfig: JSON.stringify({
      'ServiceProtocol': 'FunctionCompute',
      'ContentTypeValue': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Mock': 'FALSE',
      'MockResult': '',
      'ServiceTimeout': (conf.timeout || 3) * 1000,
      'ServiceAddress': '',
      'ServicePath': '',
      'ServiceHttpMethod': '',
      'ContentTypeCatagory': 'DEFAULT',
      'ServiceVpcEnable': 'FALSE',
      FunctionComputeConfig: {
        FcRegionId: fcRegion,
        ServiceName: serviceName,
        FunctionName: functionName,
        RoleArn: role.Role.Arn
      }
    }),
    ResultType: conf.resultType || 'PASSTHROUGH',
    ResultSample: conf.resultSample || 'result sample'
  };

  if (params.AuthType === 'OPENID') {
    var openidConf = conf.openid_connect_config || {};
    params.OpenIdConnectConfig = JSON.stringify({
      'IdTokenParamName': openidConf.id_token_param_name || 'token',
      'OpenIdApiType': openidConf.openid_api_type || 'BUSINESS',
      'PublicKeyId': openidConf.public_key_id,
      'PublicKey': openidConf.public_key
    });
  }

  if (!api) {
    api = await ag.createApi(params);
  } else {
    await ag.modifyApi(Object.assign(params, {
      ApiId: api.ApiId
    }));
  }

  return api;
}