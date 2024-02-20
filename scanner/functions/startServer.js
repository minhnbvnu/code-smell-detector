function startServer(args, config) {
  runServer(args, config, () =>
    console.log('\nReact packager ready.\n')
  );
}