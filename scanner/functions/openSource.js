function openSource(args, middlewares) {
  // Non-live sessions require sending a transform log message
  if (!isLive(args)) {
    middlewares.push(new TransformLogFlow(null, args));
  }

  // If we just want metadata we shutdown afterwards
  if (args.metadata) {
    middlewares.push(new OnlyMetadata(null));
  }

  // Assemble our message processors
  const socket = webSocketFromArgs(args);
  const stackedMiddleware = new XVIZMiddlewareStack(middlewares);

  const client = new WebSocketInterface({middleware: stackedMiddleware, socket});

  // Some middleware needs to be able to send messages/close connections
  // so provide them access to the client.
  for (let i = 0; i < middlewares.length; ++i) {
    const middleware = middlewares[i];
    if (middleware.client === null) {
      middleware.client = client;
    }
  }

  // Setup graceful shutdown
  let sigintCount = 0;
  process.on('SIGINT', () => {
    if (sigintCount === 0) {
      console.log('Closing');
      socket.close();
    } else {
      // If the user or system is really mashing Ctrl-C, then abort
      console.log('Aborting');
      process.exit(1); // eslint-disable-line no-process-exit
    }

    sigintCount++;
  });

  return client;
}