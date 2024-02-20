function set_mode(mode, ...args) {
    $verifyLegalMode(mode);
    
    // Erase the stacks
    $previousModeGraphicsCommandListStack = [];
    $mode_framesStack = [];
    $modeStack = [];
    $prevModeStack = [];

    // Set up the new mode
    $prevMode = $gameMode;
    $gameMode = mode;

    // Loop nesting is irrelvant, since we're about to leave
    // that scope permanently.
    $iteratorCount = new WeakMap();
    
    // Run the leave callback on the current mode
    if ($prevMode) { $prevMode.$leave(); }
    
    mode_frames = 0;
    $skipGraphics = false;

    // Save the previous graphics list for draw_previous_mode()
    $previousModeGraphicsCommandList = $previousGraphicsCommandList;

    // Reset the graphics
    $graphicsCommandList = [];
    $previousGraphicsCommandList = [];

    if (mode.$name[0] !== '$') {
        $systemPrint('Entering mode ' + mode.$name + ($lastBecause ? ' because "' + $lastBecause + '"' : ''));
    }
    
    // Run the enter callback on the new mode
    $iteratorCount = new WeakMap();
    if ($gameMode.$enter) { $gameMode.$enter.apply(null, args); }

    $updateHostCodeCopyRuntimeDialogVisiblity();
    throw {nextMode: mode};
}