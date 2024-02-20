function showGamepads() {
    let s = 'Gamepads = [\n';
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    for (let i = 0; i < gamepads.length; ++i) {
        let pad = gamepads[i];
        if (pad && pad.connected) {
            s += '  "' + pad.id + '",\n';
        }
    }

    s += ']';
    s = s.replace('",\n]', '"\n]');

    s += '\n\n';
    s += 'MIDI = {\n  input_port_array: [\n';
    for (let i = 0; i < midi.input_port_array.length; ++i) {
        s += '     "' + midi.input_port_array[i].name + '",\n';
    }
    s += '  ]';
    s = s.replace(',\n  ]', '\n  ]');

    s += ',\n  output_port_array: [\n';
    for (let i = 0; i < midi.output_port_array.length; ++i) {
        s += '     "' + midi.output_port_array[i].name + '",\n';
    }
    s += '  ]';
    s = s.replace(',\n  ]', '\n  ]');
    s += '\n}';
    
    console.log(s);

    window.open('controls.html?devices=' + encodeURIComponent(s), '', 'width=400,height=500');
}