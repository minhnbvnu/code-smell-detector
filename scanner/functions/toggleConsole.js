function toggleConsole(forceOpen)
    {
        frameVisible = forceOpen || !frameVisible;
        if (consoleFrame)
            consoleFrame.style.visibility = frameVisible ? "visible" : "hidden";
        else
            waitForBody();
    }