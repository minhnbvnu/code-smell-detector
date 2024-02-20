function _handle_notebook_comms(receiver, comm_msg) {
        if (comm_msg.buffers.length > 0)
            receiver.consume(comm_msg.buffers[0].buffer);
        else
            receiver.consume(comm_msg.content.data);
        const msg = receiver.message;
        if (msg != null)
            this.apply_json_patch(msg.content, msg.buffers);
    }