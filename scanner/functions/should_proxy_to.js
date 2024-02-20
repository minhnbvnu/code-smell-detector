function should_proxy_to(uri) {
        var no_proxy = get_env_var(['NO_PROXY'], true);
        if (!no_proxy)
            return true;
        // previous (naive, simple) strategy
        // var host, hosts = no_proxy.split(',');
        // for (var i in hosts) {
        //   host = hosts[i];
        //   if (host_and_ports_match(host, uri)) {
        //     return false;
        //   }
        // }
        var pattern, pattern_list = no_proxy.split(/[\s,]+/);
        for (var i in pattern_list) {
            pattern = pattern_list[i];
            if (pattern.trim().length == 0)
                continue;
            // replace leading dot by asterisk, escape dots and finally replace asterisk by .*
            var regex = new RegExp(pattern.replace(/^\./, "*").replace(/[.]/g, '\\$&').replace(/\*/g, '.*'));
            if (uri.match(regex))
                return false;
        }
        return true;
    }