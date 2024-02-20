function SqliteNodeDB(n) {
        RED.nodes.createNode(this,n);

        this.dbname = n.db;
        this.mod = n.mode;
        if (n.mode === "RWC") { this.mode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE; }
        if (n.mode === "RW") { this.mode = sqlite3.OPEN_READWRITE; }
        if (n.mode === "RO") { this.mode = sqlite3.OPEN_READONLY; }
        var node = this;

        node.doConnect = function() {
            if (node.db) { return; }
            node.db = new sqlite3.Database(node.dbname,node.mode);
            node.db.on('open', function() {
                if (node.tick) { clearTimeout(node.tick); }
                node.log("opened "+node.dbname+" ok");
            });
            node.db.on('error', function(err) {
                node.error("failed to open "+node.dbname, err);
                node.tick = setTimeout(function() { node.doConnect(); }, reconnect);
            });
        }

        node.on('close', function (done) {
            if (node.tick) { clearTimeout(node.tick); }
            if (node.db) { node.db.close(done()); }
            else { done(); }
        });
    }