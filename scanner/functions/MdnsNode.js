function MdnsNode(n) {
        var mdns = require('mdns');
        if (process.platform === "linux") {
            RED.log.info("You may ignore the warning about Bonjour compatability.");
        }
        RED.nodes.createNode(this, n);
        this.topic = n.topic || "";
        this.service = n.service;
        var node = this;
        // var sequence = [
        //     mdns.rst.DNSServiceResolve(),
        //     mdns.rst.getaddrinfo({families: [4] })
        // ];
        // var browser = mdns.createBrowser(this.service,{resolverSequence: sequence});
        var sequence = [
            mdns.rst.DNSServiceResolve(),
            'DNSServiceGetAddrInfo' in mdns.dns_sd ? mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({families:[4]}),
            mdns.rst.makeAddressesUnique()
        ];
        var browser = mdns.createBrowser((this.service), {resolverSequence:sequence});

        browser.on('serviceUp', function(service) {
            if (RED.settings.verbose) { node.log("here : " + service.name); }
            service.state = true;
            var msg = {topic:node.topic, payload:service};
            node.send(msg);
        });
        browser.on('serviceDown', function(service) {
            if (RED.settings.verbose) { node.log("away : " + service.name); }
            service.state = false;
            var msg = {topic:node.topic, payload:service};
            node.send(msg);
        });
        browser.on('error', function(exception) {
            node.error(exception.toString());
        });
        browser.start();

        node.on("close", function() {
            if (browser) { browser.stop(); }
        });
    }