function LevelNode(n) {
        RED.nodes.createNode(this,n);
        this.dbname = n.db;
        this.encoding = n.encoding || "utf8";
        this.ready = false;
        var node = this;
        lvldb(this.dbname, {valueEncoding:this.encoding}, function(err, db) {
            if (err) { node.error(err); }
            node.db = db;
            node.db.on('ready', function() { node.ready = true; });
            node.db.on('closing', function() { node.ready = false; });
        });
        node.on('close', function() {
            if (node.db) {
                node.ready = false;
                node.db.close();
            }
        });
    }