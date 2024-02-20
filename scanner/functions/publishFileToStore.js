function publishFileToStore(commandFactory, config, file, storeUrl, authToken) {
    const [, major, minor] = VERSION_REGEX.exec(config.version);
    const searchVersion = minor ? `${major}${minor}` : major;
    let publishVersion;

    return commandFactory
        .getCommand(`${config.namespace}/${config.name}@${searchVersion}`)
        .then(latest => {
            if (!latest) {
                publishVersion = minor ? `${major}${minor}.0` : `${major}.0.0`;
            } else {
                // eslint-disable-next-line max-len
                const [, latestMajor, latestMinor, latestPatch] = VERSION_REGEX.exec(latest.version);
                const patch = parseInt(latestPatch.slice(1), 10) + 1;

                publishVersion = `${latestMajor}${latestMinor}.${patch}`;
            }

            return publishVersion;
        })
        .then(version => {
            const options = {
                url: `${storeUrl}/v1/commands/${config.namespace}/${config.name}/${version}`,
                method: 'POST',
                headers: {
                    Authorization: authToken,
                    'Content-Type': 'application/octet-stream'
                },
                body: file
            };

            return req(options);
        })
        .then(response => {
            if (response.statusCode !== 202) {
                throw new Error(`An error occurred when posting file to the store:${response.body.message}`);
            }

            return commandFactory.create(config);
        });
}