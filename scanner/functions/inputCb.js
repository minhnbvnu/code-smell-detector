function inputCb(device, msg)
        {
            let msgType = msg[0] & 0xF0;
            let inChan = (msg[0] & 0x0F) + 1;

            // If we're only receiving from a specific MIDI channel
            // and the input channel doesn't match, reject this message
            if (this.chanNo && inChan != this.chanNo)
            {
                return;
            }

            // Note on
            if (msgType == 0x90 && msg.length == 3)
            {
                let noteNo = msg[1];
                let vel = msg[2];
                this.noteOn(noteNo, vel);
                return;
            }

            // Note off
            if (msgType == 0x80 && msg.length == 3)
            {
                let noteNo = msg[1];
                this.noteOn(noteNo, 0);
                return;
            }
        }