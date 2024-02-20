function convertArgs(inArgs) {
  const cmd = 'convert [-d output] <bag>';

  return inArgs.command(
    cmd,
    'Convert a rosbag to xviz',
    {
      ...StartEndOptions,
      directory: {
        alias: 'd',
        describe: 'Directory to save XVIZ data',
        type: 'string',
        required: true
      },
      rosConfig: {
        describe: 'Path to ROS Bag JSON configuration',
        type: 'string',
        required: true
      },
      format: {
        describe: 'Output data format',
        default: 'BINARY_GLB',
        choices: ['JSON_STRING', 'BINARY_GLB'],
        nargs: 1
      }
    },
    convertCmd
  );
}