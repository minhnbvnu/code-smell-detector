function bagdumpArgs(inArgs) {
  const cmd = 'bagdump <bag>';

  return inArgs.command(
    cmd,
    'Display information about a ROS bag',
    {
      ...StartEndOptions,
      topic: {
        alias: 't',
        description: 'The topic to inspect'
      },
      dumpTime: {
        type: 'boolean',
        description: 'Show start and end time of the bag'
      },
      dumpTopics: {
        type: 'boolean',
        description: 'Show start and end time of the bag'
      },
      dumpMessages: {
        type: 'boolean',
        description: 'Will dump messages, if a topic is provided only those will be dumped'
      },
      dumpDefs: {
        type: 'boolean',
        description: 'Will dump message definitions'
      }
    },
    bagdumpCmd
  );
}