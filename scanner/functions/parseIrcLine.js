function parseIrcLine(irc_con, buffer_line) {
    var msg,
        i,
        tags = [],
        tag,
        line = '',
        msg_obj,
        hold_last_lines;

    // Decode server encoding
    line = iconv.decode(buffer_line, irc_con.encoding);
    if (!line) {
        return;
    }

    // Parse the complete line, removing any carriage returns
    msg = parse_regex.exec(line.replace(/^\r+|\r+$/, ''));

    winston.debug('(connection ' + irc_con.id + ') Raw S:', line.replace(/^\r+|\r+$/, ''));

    if (!msg) {
        // The line was not parsed correctly, must be malformed
        winston.warn('Malformed IRC line: %s', line.replace(/^\r+|\r+$/, ''));
        return;
    }

    // If enabled, keep hold of the last X lines
    if (global.config.hold_ircd_lines) {
        irc_con.last_few_lines.push(line.replace(/^\r+|\r+$/, ''));

        // Trim the array down if it's getting to long. (max 3 by default)
        hold_last_lines = parseInt(global.config.hold_ircd_lines, 10) || 3;

        if (irc_con.last_few_lines.length > hold_last_lines) {
            irc_con.last_few_lines = irc_con.last_few_lines.slice(irc_con.last_few_lines.length - hold_last_lines);
        }
    }

    // Extract any tags (msg[1])
    if (msg[1]) {
        tags = msg[1].split(';');

        for (i = 0; i < tags.length; i++) {
            tag = tags[i].split('=');
            tags[i] = {tag: tag[0], value: tag[1]};
        }
    }

    msg_obj = {
        tags:       tags,
        prefix:     msg[2],
        nick:       msg[3] || msg[2],  // Nick will be in the prefix slot if a full user mask is not used
        ident:      msg[4] || '',
        hostname:   msg[5] || '',
        command:    msg[6],
        params:     msg[7] ? msg[7].split(/ +/) : []
    };

    if (msg[8]) {
        msg_obj.params.push(msg[8].trimRight());
    }

    irc_con.irc_commands.dispatch(new IrcCommands.Command(msg_obj.command.toUpperCase(), msg_obj));
}