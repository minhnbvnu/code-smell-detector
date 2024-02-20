function PushbulletIn(n) {
        RED.nodes.createNode(this, n);
        var self = this;
        var config = RED.nodes.getNode(n.config);
        if (config) {
            config.initialise();
            config.registerInputNode(this);
            config.onConfig('error', function(err) {
                self.error(err);
            });
            config.onConfig('stream_connected', function() {
                self.status({fill:'green', shape:'dot', text:'connected'});
            });
            config.onConfig('stream_disconnected', function(err) {
                self.status({fill:'grey', shape:'ring', text:'disconnected'});
            });
            config.onConfig('stream_error', function(err) {
                self.status({fill:'red', shape:'ring', text:'error, see log'});
                self.error(err);
            });
        }
    }