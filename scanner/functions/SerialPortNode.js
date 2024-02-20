function SerialPortNode(n) {
        RED.nodes.createNode(this,n);
        this.serialport = n.serialport;
        this.newline = n.newline; /* overloaded: split character, timeout, or character count */
        this.addchar = n.addchar || "";
        this.serialbaud = parseInt(n.serialbaud) || 57600;
        this.databits = parseInt(n.databits) || 8;
        this.parity = n.parity || "none";
        this.stopbits = parseInt(n.stopbits) || 1;
        this.dtr = n.dtr || "none";
        this.rts = n.rts || "none";
        this.cts = n.cts || "none";
        this.dsr = n.dsr || "none";
        this.bin = n.bin || "false";
        this.out = n.out || "char";
        this.enabled = n.enabled || true;
        this.waitfor = n.waitfor || "";
        this.responsetimeout = n.responsetimeout || 10000;

        this.changePort = (serialPort) => {
            serialPool.close(this.serialport,() => {});
            this.serialport = serialPort.serialport || this.serialport;
            this.serialbaud = parseInt(serialPort.serialbaud) || this.serialbaud;
            this.databits = parseInt(serialPort.databits) || this.databits;
            this.parity = serialPort.parity || this.parity;
            this.stopbits = parseInt(serialPort.stopbits) || this.stopbits;
            this.dtr = serialPort.dtr || this.dtr;
            this.rts = serialPort.rts || this.rts;
            this.cts = serialPort.cts || this.cts;
            this.dsr = serialPort.dsr || this.dsr;
            this.bin = serialPort.bin || this.bin;
            this.out = serialPort.out || this.out;
        }

    }