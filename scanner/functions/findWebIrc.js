function findWebIrc(connect_data) {
    var webirc_pass = global.config.webirc_pass,
        found_webirc_pass, tmp;


    // Do we have a single WEBIRC password?
    if (typeof webirc_pass === 'string' && webirc_pass) {
        found_webirc_pass = webirc_pass;

    // Do we have a WEBIRC password for this hostname?
    } else if (typeof webirc_pass === 'object' && webirc_pass[this.irc_host.hostname.toLowerCase()]) {
        found_webirc_pass = webirc_pass[this.irc_host.hostname.toLowerCase()];
    }

    if (found_webirc_pass) {
        // Build the WEBIRC line to be sent before IRC registration
        tmp = 'WEBIRC ' + found_webirc_pass + ' KiwiIRC ';
        tmp += this.user.hostname + ' ' + this.user.address;

        connect_data.prepend_data = [tmp];
    }

    return connect_data;
}