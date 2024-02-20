function MQLightServiceNode(n) {
        RED.nodes.createNode(this,n);

        var id = "mqlight_" + (n.clientid ? n.clientid : (1+Math.random()*4294967295).toString(16));

        var opts = {
            service: n.service,
            id: id
        };

        if (this.credentials) {
            opts.user = this.credentials.user;
            opts.password = this.credentials.password;
        }

        this.client = mqlight.createClient(opts, function(err) {
            if (err) {
                util.log('[mqlight] ['+id+'] not connected to service '+n.service);
            }
            else {
                util.log('[mqlight] ['+id+'] connected to service '+n.service);
            }
        });
        this.client.on("error", function(err) {
            if (err) { util.log('[mqlight] ['+id+'] '+ err.toString()); }
        });
    }