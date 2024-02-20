function SocketClient (socket) {
    var that = this;

    this.socket = socket;
    this.socket_closing = false;

    this.remoteAddress = this.socket.remoteAddress;
    winston.info('Control connection from %s opened', this.socket.remoteAddress);

    this.bindEvents();

    socket.write("\nHello, you are connected to the Kiwi server :)\n\n");

    this.control_interface = new ControlInterface(socket);
    _.each(socket_commands, function(fn, command_name) {
        that.control_interface.addCommand(command_name, fn.bind(that));
    });
}