function buildRetryStrategy(response) {
    if (response.body.status === 'QUEUED' || response.body.status === 'RUNNING') {
        throw new Error('Retry limit reached');
    }

    return response;
}