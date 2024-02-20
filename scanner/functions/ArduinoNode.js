function ArduinoNode(n) {
        RED.nodes.createNode(this,n);
        this.device = n.device || null;
        this.running = false;
        this.reported = false;
        var node = this;

        var startup = function() {
            node.board = new Board(node.device, function(e) {
                if ((e !== undefined) && (e.toString().indexOf("cannot open") !== -1) ) {
                    if (node.reported === false) {
                        node.error(RED._("arduino.errors.portnotfound",{device:node.device}));
                        node.reported = true;
                    }
                }
                else if (e === undefined) {
                    node.running = true;
                    node.reported = false;
                    node.board.once('ready', function() {
                        node.log(RED._("arduino.status.connected",{device:node.board.sp.path}));
                        if (RED.settings.verbose) {
                            node.log(RED._("arduino.status.version",{version:node.board.firmware.name+"-"+node.board.version.major+"."+node.board.version.minor}));
                        }
                    });
                    node.board.once('close', function() {
                        node.error(RED._("arduino.status.portclosed"));
                    });
                    node.board.once('disconnect', function() {
                        if (node.running === true) { setTimeout(function() { node.running = false; startup(); }, 5000); }
                    });
                }
            });
            setTimeout(function() { if (node.running === false) { startup(); } }, 5000);
        };
        startup();

        node.on('close', function(done) {
            node.running = false;
            if (node.board) {
                try {
                    node.board.transport.close(function() {
                        if (RED.settings.verbose) { node.log(RED._("arduino.status.portclosed")); }
                        done();
                    });
                }
                catch(e) { done(); }
            }
            else { done(); }
        });
    }