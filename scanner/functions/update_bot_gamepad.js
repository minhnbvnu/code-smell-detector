function update_bot_gamepad(gamepad, controls, absolute) {
    const buttons = 'abcdefq';

    for (let i = 0; i < buttons.length; ++i) {
        const b = buttons[i];
        
        const old_val = gamepad[b] ? 1 : 0;
        const new_val = controls[b] ? 1 : 0;

        gamepad['released_' + b] = (old_val && ! new_val) ? 1 : 0;
        gamepad[b + b] = gamepad['pressed_' + b] = (new_val && ! old_val) ? 1 : 0;
        gamepad[b] = new_val;
    }

    const axes = 'xy';
    for (let i = 0; i < axes.length; ++i) {
        const a = axes[i];

        const new_val = controls[a] === undefined ?
              0 : 
              $Math.max($Math.min(controls[a], 1), -1) *
              (a === 'x' || absolute ? 1 : -up_y());
        
        const old_val = gamepad['$' + a];

        gamepad['$d' + a] = new_val - old_val;
        gamepad['$' + a + a] = (old_val === 0) ? new_val : 0;;
        gamepad['$' + a] = new_val;
    }

    // Logic copied from quadplay-browser.js
    const oldAngle = gamepad.$angle;
    if ((gamepad.$y !== 0) || (gamepad.$x !== 0)) {
        gamepad.$angle = $Math.atan2(-gamepad.$y, gamepad.$x);
    }

    if ((gamepad.$y === gamepad.$dy && gamepad.$x === gamepad.$dx) || (gamepad.$y === 0 && gamepad.$x === 0)) {
        gamepad.$dangle = 0;
    } else {
        // JavaScript operator % is a floating-point operation
        gamepad.$dangle = ((3 * Math.PI + gamepad.$angle - oldAngle) % (2 * Math.PI)) - Math.PI;
    }
}