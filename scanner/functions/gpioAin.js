function gpioAin(n) {
        RED.nodes.createNode(this, n);
        this.pin = n.pin;
        this.interval = n.interval;
        this.x = new m.Aio(parseInt(this.pin));
        this.board = m.getPlatformName();
        var node = this;
        var msg = { topic:node.board+"/A"+node.pin };
        var old = -99999;
        // ADC set to 12 for IOT2050
        if (this.board === "SIMATIC IOT2050") {
            node.x.setBit(12);
        }
        this.timer = setInterval(function() {
            msg.payload = node.x.read();
            if (msg.payload !== old) {
                node.send(msg);
                old = msg.payload;
            }
        }, node.interval);

        this.on('close', function() {
            clearInterval(this.timer);
            node.x.close();
        });
    }