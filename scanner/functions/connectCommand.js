function connectCommand(vorpal) {
  vorpal
  .command('connect <host> <port>', "Connect to a new peer. Eg: connect localhost 2727")
  .alias('c')
  .action(function(args, callback) {
    if(args.host && args.port) {
      try {
        p2p.connectToPeer(args.host, args.port);
      } catch(err) {
        this.log(err);
      }
    }
    callback();
  })
}