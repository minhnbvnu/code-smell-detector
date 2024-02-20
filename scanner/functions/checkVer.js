function checkVer() {
            node.pool.query("SELECT version();", [], function(err, rows, fields) {
                if (err) {
                    node.error(err);
                    node.status({fill:"red",shape:"ring",text:RED._("mysql.status.badping")});
                    doConnect();
                }
            });
        }