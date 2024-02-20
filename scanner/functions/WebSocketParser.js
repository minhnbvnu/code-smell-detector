function WebSocketParser(flag) {
    this.buffer = new Buffer(64 * 1024); // 64KB is the max message size
    this.buffer.end = 0;
    if (flag === "draft76") {
        this.state = "skip_response";
        this.skipped_bytes = 0;
    } else {
        this.state = "frame_type";
    }
    this.frame = new WebSocketFrame();

    events.EventEmitter.call(this);
}