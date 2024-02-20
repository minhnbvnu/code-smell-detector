function DweetioInNode(n) {
        RED.nodes.createNode(this,n);
        this.thing = n.thing;
        if (dweetio == null) { dweetio = new DweetClient(); }
        var node = this;

        dweetio.listen_for(node.thing, function(dweet) {
            // This will be called anytime there is a new dweet for my-thing
            if (dweet.content.hasOwnProperty("payload")) {
                dweet.payload = dweet.content.payload;
            }
            else {
                dweet.payload = dweet.content;
            }
            delete dweet.content;
            node.send(dweet);
        });

        this.on("close", function() {
            dweetio.stop_listening_for(node.thing);
        });

    }