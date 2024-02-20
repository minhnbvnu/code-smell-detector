function restoreIsCompleted(taskId, headers) {
        let maxAttempts = 5;
        let attempt = 0;
        return new Promise(function (resolve, reject) {
            (function fetchRestoreJobStatus() {
                headers.delete("content-type");
                headers.append("content-type", "application/json");
                sooFetch(`/api/v1/task/${taskId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: headers,
                })
                    .then(responseOKOrFail('Could not fetch restore job status'))
                    .then(function (d) {
                        data = JSON.parse(d)
                        if (data.Status == "Completed") {
                            return resolve();
                        } else {
                            if (attempt == maxAttempts) {
                                throw 'Could not fetch restore job status after a number of attempts'
                            }
                            attempt++;
                            setTimeout(fetchRestoreJobStatus, 5000);
                        }
                    })
            })();
        });
    }