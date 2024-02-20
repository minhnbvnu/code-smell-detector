function midiProcessInputMessage(channel, message) {
    switch (message.type) {
    case 'NOTE_ON':
        {
            channel.$note_active = true;
            
            const note = channel.note[message.note];
            if (message.velocity === 0) {
                // Treat as a note off
                note.released = true;
                note.on = 0;
            } else {
                note.pressed = true;
                note.velocity = message.velocity;
                note.pressure = 0;
                note.on = 1;
            }
        }
        break;
        
    case 'NOTE_OFF':
        {
            const note = channel.note[message.note];
            channel.$note_active = true;
            note.released = true;
            note.on = 0;
        }
        break;
        
    case 'POLYPHONIC_AFTERTOUCH':
        channel.$note_active = true;
        channel.note[message.note].pressure = message.pressure;
        break;
        
    case 'CONTROL_CHANGE':
        {
            channel.$controller_active = true;
            const controller = channel.controller[message.controller];
            controller.delta += message.data - controller.value;
            controller.value = message.data;
        }
        break;       
        
    } // switch on type
}