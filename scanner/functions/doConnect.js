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