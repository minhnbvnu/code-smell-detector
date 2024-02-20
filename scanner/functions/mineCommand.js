function mineCommand(vorpal) {
  vorpal
    .command('mine <data>', 'Mine a new block. Eg: mine hello!')
    .alias('m')
    .action(function(args, callback) {
      if (args.data) {
        blockchain.mine(args.data);
        p2p.broadcastLatest(); 
      }
      callback();
    })
}