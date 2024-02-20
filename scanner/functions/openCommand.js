function openCommand(vorpal) {
  vorpal
    .command('open <port>', 'Open port to accept incoming connections. Eg: open 2727')
    .alias('o')
    .action(function(args, callback) {
      if (args.port) {
        if(typeof args.port === 'number') {
          p2p.startServer(args.port);
          this.log(`Listening to peers on ${args.port}`);
        } else {
          this.log(`Invalid port!`);
        }
      }
      callback();
    })
}