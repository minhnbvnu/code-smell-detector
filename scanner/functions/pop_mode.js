function pop_mode(...args) {
    if ($modeStack.length === 0) { $error('Cannot pop_mode() from a mode entered by set_mode()'); }

    // Run the leave callback on the current mode
    let old = $gameMode;
    $prevMode = $prevModeStack.pop();

    // Pop the stacks
    $previousGraphicsCommandList = $previousModeGraphicsCommandList;
    $previousModeGraphicsCommandList = $previousModeGraphicsCommandListStack.pop();
    $gameMode = $modeStack.pop();
    mode_frames = $mode_framesStack.pop();
    $skipGraphics = false;

    $iteratorCount = new WeakMap();
    old.$leave();

    // Reset the graphics
    $graphicsCommandList = [];
    
    if ($gameMode.$name[0] !== '$') {
        $systemPrint('Popping back to mode ' + $gameMode.$name + ($lastBecause ? ' because "' + $lastBecause + '"' : ''));
    }

    // Run the pop_mode event on $gameMode if it exists
    let eventName = '$pop_modeFrom' + old.$name;
    if ($gameMode[eventName] !== undefined) {
        // repeat here so that the "this" is set correctly to $gameMode
        $iteratorCount = new WeakMap();
        $gameMode[eventName](...args);
    }

    $updateHostCodeCopyRuntimeDialogVisiblity();
    throw {nextMode: $gameMode};
}