function requireConfig(filepath) {
    if (!fs.existsSync(filepath)) {
        return false;
    }

    process.stdout.write(chalk.cyan(`Getting gren config from local file ${filepath}\n`));

    if (getFileNameFromPath(filepath).match(/\./g).length === 1) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }

    return require(filepath);
}