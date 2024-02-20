function TwitterInNode(n) {
        RED.nodes.createNode(this,n);
        this.active = true;
        this.user = n.user;
        //this.tags = n.tags.replace(/ /g,'');
        this.tags = n.tags||"";
        this.twitter = n.twitter;
        this.topic = "tweets";
        this.twitterConfig = RED.nodes.getNode(this.twitter);
        this.poll_ids = [];
        this.timeout_ids = [];

        var credentials = RED.nodes.getCredentials(this.twitter);
        this.status({});

        if (this.twitterConfig.oauth) {
            var node = this;
            if (this.user === "true") {
                // Poll User Home Timeline 1/min
                this.poll(60000,"https://api.twitter.com/1.1/statuses/home_timeline.json");
            } else if (this.user === "user") {
                var users = node.tags.split(/\s*,\s*/).filter(v=>!!v);
                if (users.length === 0) {
                    node.error(RED._("twitter.warn.nousers"));
                    return;
                }
                // Poll User timeline
                users.forEach(function(user) {
                    node.poll(60000,"https://api.twitter.com/1.1/statuses/user_timeline.json",{screen_name: user});
                })
            } else if (this.user === "dm") {
                node.pollDirectMessages();
            } else if (this.user === "event") {
                this.error("This Twitter node is configured to access a user's activity stream. Twitter removed this API in August 2018 and is no longer available.");
                return;
            } else if (this.user === "false") {
                var twit = new Ntwitter({
                    consumer_key: credentials.consumer_key,
                    consumer_secret: credentials.consumer_secret,
                    access_token_key: credentials.access_token,
                    access_token_secret: credentials.access_token_secret
                });

                // Stream public tweets
                try {
                    var thing = 'statuses/filter';
                    var tags = node.tags;
                    var st = { track: [tags] };

                    var setupStream = function() {
                        if (node.restart) {
                            node.status({fill:"green", shape:"dot", text:(tags||" ")});
                            twit.stream(thing, st, function(stream) {
                                //console.log("ST",st);
                                node.stream = stream;
                                stream.on('data', function(tweet) {
                                    if (tweet.user !== undefined) {
                                        var where = tweet.user.location;
                                        var la = tweet.lang || tweet.user.lang;
                                        var msg = { topic:node.topic+"/"+tweet.user.screen_name, payload:tweet.text, lang:la, tweet:tweet };
                                        if (where) {
                                            msg.location = {place:where};
                                            addLocationToTweet(msg);
                                        }
                                        node.send(msg);
                                        //node.status({fill:"green", shape:"dot", text:(tags||" ")});
                                    }
                                });
                                stream.on('limit', function(tweet) {
                                    //node.status({fill:"grey", shape:"dot", text:RED._("twitter.errors.limitrate")});
                                    node.status({fill:"grey", shape:"dot", text:(tags||" ")});
                                    node.tout2 = setTimeout(function() { node.status({fill:"green", shape:"dot", text:(tags||" ")}); },10000);
                                });
                                stream.on('error', function(tweet,rc) {
                                    //console.log("ERRO",rc,tweet);
                                    if (rc == 420) {
                                        node.status({fill:"red", shape:"ring", text:RED._("twitter.errors.ratelimit")});
                                    }
                                    else {
                                        node.status({fill:"red", shape:"ring", text:tweet.toString()});
                                        node.warn(RED._("twitter.errors.streamerror",{error:tweet.toString(),rc:rc}));
                                    }
                                    twitterRateTimeout = Date.now() + retry;
                                    if (node.restart) {
                                        node.tout = setTimeout(function() { setupStream() },retry);
                                    }
                                });
                                stream.on('destroy', function (response) {
                                    //console.log("DEST",response)
                                    twitterRateTimeout = Date.now() + 15000;
                                    if (node.restart) {
                                        node.status({fill:"red", shape:"dot", text:" "});
                                        node.warn(RED._("twitter.errors.unexpectedend"));
                                        node.tout = setTimeout(function() { setupStream() },15000);
                                    }
                                });
                            });
                        }
                    }

                    // if 4 numeric tags that look like a geo area then set geo area
                    var bits = node.tags.split(",");
                    if (bits.length == 4) {
                        if ((Number(bits[0]) < Number(bits[2])) && (Number(bits[1]) < Number(bits[3]))) {
                            st = { locations: node.tags };
                            node.log(RED._("twitter.status.using-geo",{location:node.tags.toString()}));
                        }
                    }

                    // all public tweets
                    if (this.user === "false") {
                        node.on("input", function(msg) {
                            if (this.tags === '') {
                                if (node.tout) { clearTimeout(node.tout); }
                                if (node.tout2) { clearTimeout(node.tout2); }
                                if (this.stream) {
                                    this.restart = false;
                                    node.stream.removeAllListeners();
                                    this.stream.destroy();
                                }
                                if ((typeof msg.payload === "string") && (msg.payload !== "")) {
                                    st = { track:[msg.payload] };
                                    tags = msg.payload;

                                    this.restart = true;
                                    if ((twitterRateTimeout - Date.now()) > 0 ) {
                                        node.status({fill:"red", shape:"ring", text:tags});
                                        node.tout = setTimeout(function() {
                                            setupStream();
                                        }, twitterRateTimeout - Date.now() );
                                    }
                                    else {
                                        setupStream();
                                    }
                                }
                                else {
                                    node.status({fill:"yellow", shape:"ring", text:RED._("twitter.warn.waiting")});
                                }
                            }
                        });
                    }

                    // wait for input or start the stream
                    if ((this.user === "false") && (tags === '')) {
                        node.status({fill:"yellow", shape:"ring", text:RED._("twitter.warn.waiting")});
                    }
                    else {
                        this.restart = true;
                        setupStream();
                    }
                }
                catch (err) {
                    node.error(err);
                }
            }
            this.on('close', function() {
                if (this.tout) { clearTimeout(this.tout); }
                if (this.tout2) { clearTimeout(this.tout2); }
                if (this.stream) {
                    this.restart = false;
                    this.stream.removeAllListeners();
                    this.stream.destroy();
                }
                if (this.timeout_ids) {
                    for (var i=0; i<this.timeout_ids.length; i++) {
                        clearTimeout(this.timeout_ids[i]);
                    }
                }
                if (this.poll_ids) {
                    for (var i=0; i<this.poll_ids.length; i++) {
                        clearInterval(this.poll_ids[i]);
                    }
                }
            });
        } else {
            this.error(RED._("twitter.errors.missingcredentials"));
        }

    }