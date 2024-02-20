function $show() {
    const startTime = performance.now();
    
    // Check whether this frame will be shown or not, if running below
    // frame rate and pruning graphics.  Use mode_frames instead of
    // game_frames to ensure that frame 0 is always rendered for a mode.
    if (mode_frames % $graphicsPeriod === 0) {
        if ($onScreenHUDEnabled) {
            // Submit diagnostics HUD as additional graphics calls
            $onScreenDrawBarGraph('Frame:', $onScreenHUDDisplay.time.frame, 0xFA5F, 0);
            $onScreenDrawBarGraph('  60fps Logic:', $onScreenHUDDisplay.time.logic, 0xFFA0, 1);
            $onScreenDrawBarGraph('  ' + $onScreenHUDDisplay.time.refresh + 'fps Graphics:', $onScreenHUDDisplay.time.graphics, $THREADED_GPU ? 0xF0DE : 0xF0D0, 2);
            if ($onScreenHUDDisplay.time.physics > 0) {
                $onScreenDrawBarGraph('  60fps Physics:', $onScreenHUDDisplay.time.physics, 0xF0AF, 3);
            }
            if ($THREADED_GPU) {
                $onScreenDrawBarGraph('  ' + $onScreenHUDDisplay.time.refresh + 'fps GPU:', $onScreenHUDDisplay.time.gpu, 0xF0D0, 4);
            }
            if ($onScreenHUDDisplay.time.browser > 0) {
                $onScreenDrawBarGraph('  Browser:', $onScreenHUDDisplay.time.browser, 0xFAAA, 5);
            }
        }
        
        const backgroundSpritesheetIndex = $background.spritesheet ? $background.spritesheet.$index[0] : undefined;
        const backgroundColor16 = $background.spritesheet ? 0 : (($colorToUint16($background) >>> 0) | 0xf000);

        const args = [$graphicsCommandList, backgroundSpritesheetIndex, backgroundColor16];
                
        if ($GPU) {
            if (! $updateImageData32) {
                ++$missedFrames;
                console.log('Virtual GPU busy, skipping. mode_frames =', mode_frames);
            } else {
                
                // Transfer the updateImageData
                // console.log('Transferring updateImageData to GPU thread');
                console.assert($updateImageData32);
                
                $GPU.postMessage(
                    {
                        type: 'gpu_execute',
                        args: args,
                        updateImageData: $updateImageData,
                        updateImageData32: $updateImageData32
                    },
                    [$updateImageData32.buffer]);
                
                $updateImageData = null;
                $updateImageData32 = null;
            }
        } else {
            $gpu_execute(...args);
        }
    }
    
    // Save for draw_previous_frame()
    $previousGraphicsCommandList = $graphicsCommandList;
    
    // Clear draw list (regardless of whether it is actually drawn)
    $graphicsCommandList = [];

    // Includes submitFrame() time for non-threaded GPU
    $graphicsTime = performance.now() - startTime;
    
    $requestInput();

    ++game_frames;
    ++mode_frames;
}