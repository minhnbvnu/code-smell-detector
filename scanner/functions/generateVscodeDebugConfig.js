async function generateVscodeDebugConfig(serviceName, functionName, runtime, codePath, debugPort) {

  const stats = await fs.lstat(codePath);

  if (!stats.isDirectory()) {
    codePath = path.dirname(codePath);
  }

  switch (runtime) {
  case 'nodejs6':
    return {
      'version': '0.2.0',
      'configurations': [
        {
          'name': `fc/${serviceName}/${functionName}`,
          'type': 'node',
          'request': 'attach',
          'address': 'localhost',
          'port': debugPort,
          'localRoot': `${codePath}`,
          'remoteRoot': '/code',
          'protocol': 'legacy',
          'stopOnEntry': false
        }
      ]
    };
  case 'nodejs12':
  case 'nodejs10':
  case 'nodejs8':
    return {
      'version': '0.2.0',
      'configurations': [
        {
          'name': `fc/${serviceName}/${functionName}`,
          'type': 'node',
          'request': 'attach',
          'address': 'localhost',
          'port': debugPort,
          'localRoot': `${codePath}`,
          'remoteRoot': '/code',
          'protocol': 'inspector',
          'stopOnEntry': false
        }
      ]
    };
  case 'python3':
  case 'python2.7':
    return {
      'version': '0.2.0',
      'configurations': [
        {
          'name': `fc/${serviceName}/${functionName}`,
          'type': 'python',
          'request': 'attach',
          'host': 'localhost',
          'port': debugPort,
          'pathMappings': [
            {
              'localRoot': `${codePath}`,
              'remoteRoot': '/code'
            }
          ]
        }
      ]
    };
  case 'java8':
  case 'java11':
    return {
      'version': '0.2.0',
      'configurations': [
        {
          'name': `fc/${serviceName}/${functionName}`,
          'type': 'java',
          'request': 'attach',
          'hostName': 'localhost',
          'port': debugPort
        }
      ]
    };
  case 'php7.2':
    return {
      'version': '0.2.0',
      'configurations': [
        {
          'name': `fc/${serviceName}/${functionName}`,
          'type': 'php',
          'request': 'launch',
          'port': debugPort,
          'stopOnEntry': false,
          'pathMappings': {
            '/code': `${codePath}`
          },
          'ignore': [
            '/var/fc/runtime/**'
          ]
        }
      ]
    };
  case 'dotnetcore2.1':
    return {
      'version': '0.2.0',
      'configurations': [
        {
          'name': `fc/${serviceName}/${functionName}`,
          'type': 'coreclr',
          'request': 'attach',
          'processName': 'dotnet',
          'pipeTransport': {
            'pipeProgram': 'sh',
            'pipeArgs': [
              '-c',
              `docker exec -i $(docker ps -q -f publish=${debugPort}) \${debuggerCommand}`
            ],
            'debuggerPath': '/vsdbg/vsdbg',
            'pipeCwd': '${workspaceFolder}'
          },
          'windows': {
            'pipeTransport': {
              'pipeProgram': 'powershell',
              'pipeArgs': [
                '-c',
                `docker exec -i $(docker ps -q -f publish=${debugPort}) \${debuggerCommand}`
              ],
              'debuggerPath': '/vsdbg/vsdbg',
              'pipeCwd': '${workspaceFolder}'
            }
          },
          'sourceFileMap': {
            '/code': codePath
          }
        }

      ]
    };
  default:
    break;
  }

  debug('CodePath: ' + codePath);
}