function setupLogging() {
    // Poor man's logging framework, wooh...
    const originalConsoleLog = console.log;
    const logStream = fs.createWriteStream("site/output/data/log.txt", { flags: "a" });
    logStream.write("===========================================\n\n");
    console.log = (message) => {
        const formattedMessage = `[${new Date().toISOString()}] ${message}\n`;
        logStream.write(formattedMessage);
        originalConsoleLog.apply(console, [message]);
    };
}