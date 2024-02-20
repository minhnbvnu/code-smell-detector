function parallelExec(commands) {
    // Use the array of commands to create an array of Promises
    let promises = commands.map(command => execP(command, {encoding: "utf8"}));
    // Return a Promise that will fulfill to an array of the fulfillment
    // values of each of the individual promises. (Instead of returning objects
    // with stdout and stderr properties we just return the stdout value.)
    return Promise.all(promises)
        .then(outputs => outputs.map(out => out.stdout));
}