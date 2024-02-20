function getFcReqHeaders(headers, reqeustId, envs) {
  const fcHeaders = {};
  // fcHeaders['connection'] = headers['connection'] ? headers['connection'] : 'keep-alive';
  fcHeaders['content-type'] = headers['content-type'] ? headers['content-type'] : 'application/octet-stream';
  fcHeaders['x-fc-request-id'] = headers['x-fc-request-id'] ? headers['x-fc-request-id'] : reqeustId;
  fcHeaders['x-fc-function-name'] = headers['x-fc-function-name'] ? headers['x-fc-function-name'] : envs['FC_FUNCTION_NAME'] || 'fc-docker';
  fcHeaders['x-fc-function-memory'] = headers['x-fc-function-memory'] ? headers['x-fc-function-memory'] : envs['FC_MEMORY_SIZE'];
  fcHeaders['x-fc-function-timeout'] = headers['x-fc-function-timeout'] ? headers['x-fc-function-timeout'] : envs['FC_TIMEOUT'];
  fcHeaders['x-fc-initialization-timeout'] = headers['x-fc-initialization-timeout'] ? headers['x-fc-initialization-timeout'] : envs['FC_INITIALIZATION_TIMEOUT'];
  fcHeaders['x-fc-function-initializer'] = headers['x-fc-function-initializer'] ? headers['x-fc-function-initializer'] : envs['FC_INITIALIZER'];
  fcHeaders['x-fc-function-handler'] = headers['x-fc-function-handler'] ? headers['x-fc-function-handler'] : envs['FC_HANDLER'];
  fcHeaders['x-fc-access-key-id'] = headers['x-fc-access-key-id'] ? headers['x-fc-access-key-id'] : envs['FC_ACCESS_KEY_ID'];
  fcHeaders['x-fc-access-key-secret'] = headers['x-fc-access-key-secret'] ? headers['x-fc-access-key-secret'] : envs['FC_ACCESS_KEY_SECRET'];
  fcHeaders['x-fc-security-token'] = headers['x-fc-security-token'] ? headers['x-fc-security-token'] : envs['FC_SECURITY_TOKEN'];
  fcHeaders['x-fc-region'] = headers['x-fc-region'] ? headers['x-fc-region'] : envs['FC_REGION'];
  fcHeaders['x-fc-account-id'] = headers['x-fc-account-id'] ? headers['x-fc-account-id'] : envs['FC_ACCOUNT_ID'];
  fcHeaders['x-fc-service-name'] = headers['x-fc-service-name'] ? headers['x-fc-service-name'] : envs['FC_SERVICE_NAME'];
  fcHeaders['x-fc-service-logproject'] = headers['x-fc-service-logproject'] ? headers['x-fc-service-logproject'] : envs['FC_SERVICE_LOG_PROJECT'];
  fcHeaders['x-fc-service-logstore'] = headers['x-fc-service-logstore'] ? headers['x-fc-service-logstore'] : envs['FC_SERVICE_LOG_STORE'];
  return fcHeaders;
}