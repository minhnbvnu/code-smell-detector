function onMIDIMessage(message) {
    message.stopPropagation();
    const port = midi.input_port_table[message.target.name + message.target.id];
    
    const status = message.data[0];
    const data1 = message.data[1];
    
    // A velocity value might not be included with a noteOff command
    const data2 = (message.data.length > 2) ? message.data[2] : 0;

    const combined_data = (data2 << 7) + data1;
    
    const outmessage = {
        port: port,
        raw: [...message.data]
    };

    switch (status) {
    case 0xF0: // sysex start
        outmessage.type = "SYSEX_START";
        outmessage.manufacturer = data1;
        outmessage.data = data2;
        break;

    case 0xF1: // time code
        outmessage.type = "TIME";
        outmessage.data = data1;

    case 0xF2: // song pointer
        outmessage.type = "SONG_POINTER";
        outmessage.data = combined_data;
        break;

    case 0xF3: // song select
        outmessage.type = "SONG_SELECT";
        outmessage.song = data1;
        break;

    case 0xF6: // tune request
        outmessage.type = "TUNE";
        break;

    case 0xF7:
        outmessage.type = "SYSEX_END";
        break;

    case 0xF8:
        outmessage.type = "TIMING_CLOCK";
        break;

    case 0xF9:
        outmessage.type = "MEASURE_END";
        break;

    case 0xFA:
        outmessage.type = "START";
        break;
        
    case 0xFB:
        outmessage.type = "CONTINUE";
        break;

    case 0xFC:
        outmessage.type = "STOP";
        break;

    case 0xFE:
        outmessage.type = "ACTIVE_SENSING";
        break;

    case 0xFF:
        outmessage.type = "RESET";
        break;

    default:
        {
            // Allow MIDI to keep quadplay awake
            updateLastInteractionTime();
            const type = status >> 4;
            outmessage.channel = status & 0x0f;
            
            switch (type) {
            case 0x8:
                outmessage.type = "NOTE_OFF";
                outmessage.note = data1;
                break;

            case 0x9:
                outmessage.type = "NOTE_ON";
                outmessage.note = data1;
                outmessage.velocity = data2;
                break;
                
            case 0xA: // aftertouch
                outmessage.type = "POLYPHONIC_AFTERTOUCH";
                outmessage.note = data1;
                outmessage.pressure = data2;
                break;
                
            case 0xB: // control change
                outmessage.type = "CONTROL_CHANGE";
                outmessage.controller = data1;
                outmessage.data = data2;
                break;

            case 0xC: // program change
                outmessage.type = "PROGRAM_CHANGE";
                outmessage.program = data1;
                break;
                
            case 0xD: // channel aftertouch
                outmessage.type = "CHANNEL_AFTERTOUCH";
                outmessage.pressure = data1;
                break;
                
            case 0xE: // pitch wheel
                outmessage.type = "PITCH_WHEEL";
                outmessage.data = combined_data;
                break;
            }
        } // channel messages
    } // switch status
    
    Object.freeze(outmessage);
    midi.message_queue.push(outmessage);

    // console.log(outmessage);

    // If the game is not running, immediately process the queue so
    // that port note state is up to date when the game resumes/starts,
    // but the message queue is not backing up.
    if (emulatorMode !== 'play') {
        midiBeforeFrame();
        midiAfterFrame();
    }
}