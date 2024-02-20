function makeChannel() {
        const channel = {
            $note_active: false,
            $controller_active: false,
            note: new Array(128),
            controller: new Array(128)
        };
        
        for (let i = 0; i < 128; ++i) {
            channel.note[i] = Object.seal({on: 0, pressed: 0, released: 0, velocity: 0, pressure: 0});
            channel.controller[i] = Object.seal({value: 0, delta: 0});
        }

        Object.seal(channel.note);
        Object.seal(channel.controller);
        
        return channel;
    }