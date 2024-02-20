function signGitHubWebhookBlob(key, blob) {
            return 'sha1=' + crypto.createHmac('sha1', key).update(blob).digest('hex');
        }