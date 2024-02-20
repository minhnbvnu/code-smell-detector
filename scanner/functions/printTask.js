function printTask(isQuiet, name) {
    if (isQuiet) {
        return;
    }

    process.stdout.write(chalk.blue(`\n🤖  - ${name}:\n===================================\n`));
}