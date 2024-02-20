function discoverCommand(vorpal) {
  vorpal
  .command('discover', 'Discover new peers from your connected peers.')
  .alias('d')
  .action(function(args, callback) {
    try {
      p2p.discoverPeers();
    } catch(err) {
      this.log(err);
    }
    callback();
  })
}