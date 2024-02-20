function clearTasks(gren) {
    if (!Object.keys(gren.tasks.length)) {
        return;
    }

    Object.keys(gren.tasks).forEach((taskName) => {
        gren.tasks[taskName].stop();
    });

    process.stdout.write(chalk.red('\nTask(s) stopped because of the following error:\n'));

    gren.tasks = [];
}