function blockchainCommand(vorpal) {
  vorpal
    .command('blockchain', 'See the current state of the blockchain.')
    .alias('bc')
    .action(function(args, callback) {
      this.log(blockchain)
      callback();
    })
}