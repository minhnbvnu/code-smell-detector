function DweetioOutNode(n) {
        RED.nodes.createNode(this,n);
        this.thing = n.thing;
        if (dweetio == null) { dweetio = new DweetClient(); }
        var node = this;

        var isObject = function(a) {
            if ((typeof(a) === "object") && (!Buffer.isBuffer(a)) && (!Array.isArray(a))) { return true; }
            else { return false; }
        };

        this.on("input",function(msg) {
            if (!isObject(msg.payload)) {
                msg.payload = {payload:msg.payload};
            }
            var thing = node.thing || msg.thing;
            try {
                dweetio.dweet_for(thing, msg.payload, function(err, dweet) {
                        //console.log(dweet.thing);   // "my-thing"
                        //console.log(dweet.content); // The content of the dweet
                        //console.log(dweet.created); // The create date of the dweet
                    });
            }
            catch (err) {
                node.log(err);
            }
        });

    }