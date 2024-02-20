function IrcCommand(command, data) {
    this.command = command += '';
    this.params = _.clone(data.params);
    this.tags = _.clone(data.tags);

    this.prefix = data.prefix;
    this.nick = data.nick;
    this.ident = data.ident;
    this.hostname = data.hostname;
}