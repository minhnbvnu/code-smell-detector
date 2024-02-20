function clearExternalFiles() {
    cascadeStudioWorker.postMessage({
        "type": "clearExternalFiles"
    });
    consoleGolden.setState({});
}