function checkInitNewConversation(nick) {
                if(nick !== config.irc.user) {
                    if(conversations[nick] === undefined || conversations[nick] === null) {
                        var c = new Conversation(nick, config.irc.user);
                        conversations[nick] = c;
                        if(muted) {
                            c.mute();
                        }
                        else {
                            c.greet();
                        }
                        c.on("preempt", function () {
                            var now = new Date();
                            var now_utc = new Date(now.getUTCFullYear(),
                                now.getUTCMonth(), now.getUTCDate(),
                                now.getUTCHours(), now.getUTCMinutes(),
                                now.getUTCSeconds());
                            var secondsPastMidnightUTC = now_utc.getSeconds() + 60 *
                                now_utc.getMinutes() + 60 * 60 * now_utc.getHours();
                            media.preempt = secondsPastMidnightUTC;
                        });
                        c.on("say", function(msg) {
                            client.say(config.irc.channel, msg);
                        });
                        c.on("mute", function() {
                            for(var key in conversations) {
                                conversations[key].mute();
                                muted = true;
                            }
                        });
                        c.on("unmute", function() {
                            for(var key in conversations) {
                                conversations[key].unmute();
                                muted = false;
                            }
                        });
                    }
                }
            }