function getSubCommand (args, cmd) {
    if (['platform', 'platforms', 'plugin', 'plugins', 'telemetry', 'config'].indexOf(cmd) > -1) {
        return args[3]; // e.g: args='node cordova platform rm ios', 'node cordova telemetry on'
    }
    return null;
}