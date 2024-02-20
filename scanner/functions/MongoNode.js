function MongoNode(n) {
        RED.nodes.createNode(this,n);
        this.hostname = n.hostname;
        this.port = n.port;
        this.db = n.db;
        this.name = n.name;
        this.connectOptions= n.connectOptions;
        this.topology = n.topology;

        //console.log(this);

        var clustered = (this.topology !== "direct") || false;

        var url = "mongodb://";
        if (this.topology === "dnscluster") {
            url = "mongodb+srv://";
        }
        if (this.credentials && this.credentials.user && this.credentials.password) {
            this.user = this.credentials.user;
            this.password =  this.credentials.password;
        } else {
            this.user = n.user;
            this.password = n.password;
        }
        if (this.user) {
            url += this.user+":"+this.password+"@";
        }
        if (clustered) {
            url += this.hostname + "/" + this.db
        } else {
            url += this.hostname + ":" + this.port + "/" + this.db;
        }
        if (this.connectOptions){
            url += "?" + this.connectOptions;
        }

        console.log("MongoDB URL: " + url);
        this.url = url;
    }