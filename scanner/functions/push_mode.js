function push_mode(mode, ...args) {
    $verifyLegalMode(mode);

    // Push the stacks
    $previousModeGraphicsCommandListStack.push($previousModeGraphicsCommandList);
    $mode_framesStack.push(mode_frames);
    $modeStack.push($gameMode);
    $prevModeStack.push($prevMode);

    mode_frames = -1;
    $skipGraphics = false;
    $prevMode = $gameMode;
    $gameMode = mode;
    
    $previousModeGraphicsCommandList = $previousGraphicsCommandList;

    // Reset the graphics
    $graphicsCommandList = [];
    $previousGraphicsCommandList = [];

    if (mode.$name[0] !== '$') {
        $systemPrint('Pushing into mode ' + mode.$name + ($lastBecause ? ' because "' + $lastBecause + '"' : ''));
    }

    // Run the enter callback on the new mode
    $iteratorCount = new WeakMap();
    $gameMode.$enter.apply(null, args);

    $updateHostCodeCopyRuntimeDialogVisiblity();
    throw {nextMode: mode};
}