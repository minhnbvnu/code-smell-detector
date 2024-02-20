function serverArgs(inArgs, {defaultCommand = false} = {}) {
  const cmd = defaultCommand ? ['server', '*'] : 'server';

  return inArgs.command(
    cmd,
    'Start an XVIZ Server',
    {
      // client can request, otherwise default to source data format
      format: {
        describe: 'Output data format',
        choices: ['JSON_STRING', 'JSON_BUFFER', 'BINARY_GLB', 'BINARY_PBE'],
        nargs: 1
      },
      live: {
        describe: 'Return data as if from a live stream',
        boolean: true
      },
      delay: {
        describe: 'The delay between sending messages in milliseconds',
        type: 'number',
        default: 50
      },
      scenarios: {
        describe: 'Enable Scenario support',
        type: 'boolean',
        default: true,
        group: 'Scenario Options:'
      },
      duration: {
        describe: 'The duration in seconds of the generated scenario log',
        type: 'number',
        default: 30,
        group: 'Scenario Options:'
      },
      hz: {
        describe: 'The frequency of updates for a generated scenario log',
        type: 'number',
        default: 10,
        group: 'Scenario Options:'
      },
      directory: {
        alias: 'd',
        describe: 'Data directory source.  Multiple directories are supported',
        type: 'string',
        required: true,
        group: 'Hosting Options:'
      },
      port: {
        describe: 'Port to listen on',
        group: 'Hosting Options:'
      },
      verbose: {
        alias: 'v',
        count: true,
        describe: 'Logging level'
      }
    },
    serverCmd
  );
}