function task(gren, taskName) {
    if (gren.options.quiet) {
        gren.tasks[taskName] = {};

        return noop;
    }
    const spinner = ora(taskName);
    gren.tasks[taskName] = spinner;

    spinner.start();

    return message => {
        spinner.succeed(message);
    };
}