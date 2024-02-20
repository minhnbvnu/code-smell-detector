function unsubscribe(node) {
        var dev = node.dev;
        if (subscriptions[dev]) {
            if (subscriptions[dev].count == 1) {
                var sid = subscriptions[dev].sid;

                var device = wemo.get(dev);
                //need to unsubsribe properly here
                var unSubOpts = {
                    host: device.ip,
                    port: device.port,
                    path: device.device.UDN.indexOf('Bridge-1_0') < 0 ? '/upnp/event/basicevent1' : '/upnp/event/bridge1',
                    method: 'UNSUBSCRIBE',
                    headers: {
                        'SID': sid
                    }
                };

                //console.log(util.inspect(unSubOpts));

                var unSubreq = http.request(unSubOpts, function(res) {
                    //console.log("unsubscribe: %s \n %s", device.name, res.statusCode);
                    delete subscriptions[dev];
                    delete sub2dev[sid];
                });

                unSubreq.end();

            }
            else {
                subscriptions[dev].count--;
            }
        }
        else {
            //shouldn't ever get here
        }
    }