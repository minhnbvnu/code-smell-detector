function MySQLNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
        this.tz = n.tz || "local";
        this.charset = (n.charset || "UTF8_GENERAL_CI").toUpperCase();

        this.connected = false;
        this.connecting = false;

        this.dbname = n.db;
        this.setMaxListeners(0);
        var node = this;

        function checkVer() {
            node.pool.query("SELECT version();", [], function(err, rows, fields) {
                if (err) {
                    node.error(err);
                    node.status({fill:"red",shape:"ring",text:RED._("mysql.status.badping")});
                    doConnect();
                }
            });
        }

        function doConnect() {
            node.connecting = true;
            node.emit("state","connecting");
            if (!node.pool) {
                node.pool = mysqldb.createPool({
                    host : node.host,
                    port : node.port,
                    user : node.credentials.user,
                    password : node.credentials.password,
                    database : node.dbname,
                    timezone : node.tz,
                    insecureAuth: true,
                    multipleStatements: true,
                    connectionLimit: RED.settings.mysqlConnectionLimit || 50,
                    connectTimeout: 30000,
                    charset: node.charset,
                    decimalNumbers: true
                });
            }

            // connection test
            node.pool.getConnection(function(err, connection) {
                node.connecting = false;
                if (err) {
                    node.emit("state",err.code);
                    node.error(err);
                    node.tick = setTimeout(doConnect, reconnect);
                }
                else {
                    node.connected = true;
                    node.emit("state","connected");
                    if (!node.check) { node.check = setInterval(checkVer, 290000); }
                    connection.release();
                }
            });
        }

        node.connect = function() {
            if (!node.connected && !node.connecting) {
                doConnect();
            }
        }

        node.on('close', function(done) {
            if (node.tick) { clearTimeout(node.tick); }
            if (node.check) { clearInterval(node.check); }
            // node.connection.release();
            node.emit("state"," ");
            if (node.connected) {
                node.connected = false;
                node.pool.end(function(err) { done(); });
            }
            else {
                delete node.pool;
                done();
            }

        });
    }