function peersCommand(vorpal) {
  vorpal
    .command('peers', 'Get the list of connected peers.')
    .alias('p')
    .action(function(args, callback) {
      p2p.peers.forEach(peer => {
        this.log(`${peer.pxpPeer.socket._host} \n`)
      }, this)
      callback();
    })
}