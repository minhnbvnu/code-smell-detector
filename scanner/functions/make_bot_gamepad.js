function make_bot_gamepad(color, name, index) {

    const gamepad = {
        $x: 0, $y: 0, $dx: 0, $dy: 0,
        $angle: 0, $dangle: 0,
        a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, $p: 0, q: 0,
        aa: 0, bb: 0, cc: 0, dd: 0, ee: 0, ff: 0, $pp: 0, qq: 0,
        pressed_a: 0, pressed_b: 0, pressed_c: 0, pressed_d: 0, pressed_e: 0, pressed_f: 0, $pressed_p: 0, pressed_q: 0,
        released_a: 0, released_b: 0, released_c: 0, released_d: 0, released_e: 0, released_f: 0, $released_p: 0, released_q: 0,
        $status: "bot",
        index: index,
        online_name: name || "bot",
        player_color: Object.freeze(color === undefined ? gray(0.8) : clone(color)),
        prompt: Object.freeze(Object.assign({'##': 'AI'}, $controlSchemeTable.Quadplay)),
        type: "Quadplay"
    };
    
    $bind_gamepad_getters(gamepad);

    return Object.seal(gamepad);
}