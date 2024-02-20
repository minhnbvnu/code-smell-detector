function IrcCommandsHandler (irc_connection) {
    this.irc_connection = irc_connection;
    this.handlers = [];

    require('./commands/registration')(this);
    require('./commands/channel')(this);
    require('./commands/user')(this);
    require('./commands/messaging')(this);
    require('./commands/misc')(this);
}