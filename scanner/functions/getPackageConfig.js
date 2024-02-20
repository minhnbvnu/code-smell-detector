function getPackageConfig(filepath) {
  const file = readFileSync(filepath);
  const config = parse(file);

  const npmOverride = { ...config.npm };
  delete npmOverride.dependencies;
  delete npmOverride.devDependencies;

  const parsedConfig = {
    title: config.title,
    description: config.description,
    version: config.version,
    license: config.license,
    main: config.main,
    authors: config.authors,
    keywords: config.keywords,
    build: config.build,
    target: config.target,
    // eslint-disable-next-line camelcase
    git_repository: config.git_repository,
    documentation: config.documentation,
    scripts: config.scripts,
    servers: config.servers,
    workers: config.workers,
    executor: config.executor,
    dependencies: [],
    npm: { dependencies: [], devDependencies: [] },
    npmOverride,
  };

  if (config.dependencies)
    parsedConfig.dependencies = parseDependencies(config.dependencies);

  if (config.npm?.dependencies)
    parsedConfig.npm.dependencies = parseDependencies(config.npm.dependencies);

  if (config.npm?.devDependencies)
    parsedConfig.npm.devDependencies = parseDependencies(
      config.npm.devDependencies
    );

  return parsedConfig;
}