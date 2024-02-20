function TwitterCredentialsNode(n) {
        RED.nodes.createNode(this,n);
        this.screen_name = n.screen_name;
        if (this.screen_name && this.screen_name[0] === "@") {
            this.screen_name = this.screen_name.substring(1);
        }
        if (this.credentials.consumer_key &&
            this.credentials.consumer_secret &&
            this.credentials.access_token &&
            this.credentials.access_token_secret) {

            this.oauth = {
                consumer_key: this.credentials.consumer_key,
                consumer_secret: this.credentials.consumer_secret,
                token: this.credentials.access_token,
                token_secret: this.credentials.access_token_secret
            }
            this.credHash = crypto.createHash('sha1').update(
                this.credentials.consumer_key+this.credentials.consumer_secret+
                this.credentials.access_token+this.credentials.access_token_secret
            ).digest('base64');
            var self = this;
            if (localUserCache.hasOwnProperty(self.credHash)) {
                this.localIdentityPromise = Promise.resolve(localUserCache[self.credHash]);
            } else {
                this.localIdentityPromise = this.get("https://api.twitter.com/1.1/account/settings.json").then(function(body) {
                    if (body.status === 200) {
                        localUserCache[self.credHash] = body.body.screen_name;
                        self.screen_name = body.body.screen_name;
                    } else {
                        self.warn("Failed to get user profile");
                    }
                });
            }
        }
    }