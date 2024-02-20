function OfficeEvents(config) {
  this.config = config;

  config.currentUser.imageUrl = encodeURIComponent(config.currentUser.imageUrl);

  const user = JSON.stringify(config.currentUser);

  const queryConn = `user=${user}&room=${config.currentRoom}`;
  
  this.socketIO = io.connect(config.domain, {
    query: queryConn
  });
}