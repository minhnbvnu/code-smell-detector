function fetchAndRenderConsoleLog(){
    if (!logIsFetched){
        fetchMatchedScriptConsole()
    }
    renderScriptConsole(scriptConsole);
}