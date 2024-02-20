function socketOnData(data) {
    var data_pos,               // Current position within the data Buffer
        line_start = 0,
        lines = [],
        i,
        max_buffer_size = 1024; // 1024 bytes is the maximum length of two RFC1459 IRC messages.
                                // May need tweaking when IRCv3 message tags are more widespread

    // Split data chunk into individual lines
    for (data_pos = 0; data_pos < data.length; data_pos++) {
        if (data[data_pos] === 0x0A) { // Check if byte is a line feed
            lines.push(data.slice(line_start, data_pos));
            line_start = data_pos + 1;
        }
    }

    // No complete lines of data? Check to see if buffering the data would exceed the max buffer size
    if (!lines[0]) {
        if ((this.held_data ? this.held_data.length : 0 ) + data.length > max_buffer_size) {
            // Buffering this data would exeed our max buffer size
            this.emit('error', 'Message buffer too large');
            this.socket.destroy();

        } else {

            // Append the incomplete line to our held_data and wait for more
            if (this.held_data) {
                this.held_data = Buffer.concat([this.held_data, data], this.held_data.length + data.length);
            } else {
                this.held_data = data;
            }
        }

        // No complete lines to process..
        return;
    }

    // If we have an incomplete line held from the previous chunk of data
    // merge it with the first line from this chunk of data
    if (this.hold_last && this.held_data !== null) {
        lines[0] = Buffer.concat([this.held_data, lines[0]], this.held_data.length + lines[0].length);
        this.hold_last = false;
        this.held_data = null;
    }

    // If the last line of data in this chunk is not complete, hold it so
    // it can be merged with the first line from the next chunk
    if (line_start < data_pos) {
        if ((data.length - line_start) > max_buffer_size) {
            // Buffering this data would exeed our max buffer size
            this.emit('error', 'Message buffer too large');
            this.socket.destroy();
            return;
        }

        this.hold_last = true;
        this.held_data = new Buffer(data.length - line_start);
        data.copy(this.held_data, 0, line_start);
    }

    this.read_buffer = this.read_buffer.concat(lines);
    processIrcLines(this);
}