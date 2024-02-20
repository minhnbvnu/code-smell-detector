function removeCommand(command, storeUrl, authToken) {
    const options = {
        url: `${storeUrl}/v1/commands/${command.namespace}/${command.name}/${command.version}`,
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Content-Type': 'application/octet-stream'
        }
    };

    return req(options).then(response => {
        if (response.statusCode !== 204) {
            throw new Error(`An error occured when trying to remove binary from the store:${response.body.message}`);
        }

        return command.remove();
    });
}