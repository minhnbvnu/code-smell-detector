function midiInputChannelBeforeFrame(channel) {
    if (channel.$note_active) {
        const note = channel.note;
        for (let n = 0; n < 128; ++n) {
            note[n].on += note[n].on ? 1 : 0;
            note[n].pressed = note[n].released = false;
        }
    }
    
    if (channel.$controller_active) {
        const controller = channel.controller;
        for (let c = 0; c < 128; ++c) {
            controller[c].delta = 0;
        }
    }
}