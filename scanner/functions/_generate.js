function _generate(argv, config, resolve, reject) {
  const args = parseCommandLine([{
    command: 'platform',
    description: 'Platform (ios|android|ubuntu)',
    type: 'string',
    required: true,
  },
  {
    command: 'project-path',
    description: 'Path to the project directory',
    type: 'string',
    required: true,
  },
  {
    command: 'project-name',
    description: 'Name of the project',
    type: 'string',
    required: true,
  }], argv);

  const oldCwd = process.cwd();
  process.chdir(args['project-path']);

  const env = yeoman.createEnv();
  env.register(path.join(__dirname, '../generator'), 'react:app');
  env.run(
    ['react:app', args['project-name']],
    {
      'skip-ios': args.platform !== 'ios',
      'skip-ubuntu': args.platform !== 'ubuntu',
      'skip-android': args.platform !== 'android'
    },
    () => {
      process.chdir(oldCwd);
      resolve();
    }
  );
}