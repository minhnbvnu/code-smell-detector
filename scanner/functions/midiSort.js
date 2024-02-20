function midiSort(a, b) {
            const am = (a.name.indexOf('MIDI') !== -1) && (a.name.indexOf('DAW') === -1) && (a.name.indexOf('Live') === -1) ? 1 : 0;
            const bm = (b.name.indexOf('MIDI') !== -1) && (b.name.indexOf('DAW') === -1) && (a.name.indexOf('Live') === -1) ? 1 : 0;
            return bm - am;
        }