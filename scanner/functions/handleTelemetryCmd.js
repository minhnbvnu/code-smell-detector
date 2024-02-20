function handleTelemetryCmd (subcommand, isOptedIn) {
    if (subcommand !== 'on' && subcommand !== 'off') {
        logger.subscribe(events);
        printHelp('telemetry');
        return;
    }

    const turnOn = subcommand === 'on';
    let cmdSuccess = true;

    // turn telemetry on or off
    try {
        if (turnOn) {
            telemetry.turnOn();
            console.log('Thanks for opting into telemetry to help us improve cordova.');
        } else {
            telemetry.turnOff();
            console.log('You have been opted out of telemetry. To change this, run: cordova telemetry on.');
        }
    } catch (ex) {
        cmdSuccess = false;
    }

    // track or not track ?, that is the question

    if (!turnOn) {
        // Always track telemetry opt-outs (whether user opted out or not!)
        telemetry.track('telemetry', 'off', 'via-cordova-telemetry-cmd', cmdSuccess ? 'successful' : 'unsuccessful');
        return Promise.resolve();
    }

    if (isOptedIn) {
        telemetry.track('telemetry', 'on', 'via-cordova-telemetry-cmd', cmdSuccess ? 'successful' : 'unsuccessful');
    }

    return Promise.resolve();
}