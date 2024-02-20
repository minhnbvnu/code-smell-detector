function processIrcLines(irc_con, continue_processing) {
    if (irc_con.reading_buffer && !continue_processing) return;
    irc_con.reading_buffer = true;

    var lines_per_js_tick = 4,
        processed_lines = 0;

    while(processed_lines < lines_per_js_tick && irc_con.read_buffer.length > 0) {
        parseIrcLine(irc_con, irc_con.read_buffer.shift());
        processed_lines++;
        Stats.incr('irc.connection.parsed_lines');
    }

    if (irc_con.read_buffer.length > 0) {
        irc_con.setTimeout(processIrcLines, 1, irc_con, true);
    } else {
        irc_con.reading_buffer = false;
    }
}