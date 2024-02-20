function shouldShortenLongname() {
    if (env.conf && env.conf.templates && env.conf.templates.useShortNamesInLinks) {
        return true;
    }

    return false;
}