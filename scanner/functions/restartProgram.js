function restartProgram(numBootAnimationFrames) {
    resetEmulatorKeyState();

    reloadRuntime(function () {
        try {
            // Inject the constants into the runtime space. Define
            // assets first so that references can point to them.
            makeAssets(QRuntime, gameSource.assets);
            makeConstants(QRuntime, gameSource.constants, gameSource.CREDITS);
        } catch (e) {
            // Compile-time error
            onStopButton();
            setErrorStatus(e);
        }

        // Create the main loop function in the QRuntime environment so
        // that it sees those variables.
        try {
            coroutine = QRuntime.$makeCoroutine(compiledProgram);
            QRuntime.$numBootAnimationFrames = numBootAnimationFrames; 
            lastAnimationRequest = setTimeout(mainLoopStep, 0);
            emulatorKeyboardInput.focus({preventScroll:true});
            updateDebugger(true);
            
        } catch (e) {
            // "Link"-time or run-time on a script error
            onError(e);
            return;
        }
    });
}