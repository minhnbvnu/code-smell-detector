function getConfigFromRemote(url) {
    if (!url) return null;

    process.stdout.write(chalk.cyan(`Fetching gren config from remote: ${url}\n`));

    let config = null;
    try {
        config = requireFromUrl(url);
    } catch (error) {
        // console.error(error);
        process.stdout.write(chalk.cyan(`Fetched remote config fail: ${url}\n`));
        throw new Error(error);
    }

    process.stdout.write(chalk.cyan(`Fetched remote config succeed`));

    return config;
}