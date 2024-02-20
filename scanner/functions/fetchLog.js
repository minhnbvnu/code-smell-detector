async function fetchLog({ baseUrl, linesFrom, authToken, page, sort }) {
    const output = [];
    const requestStream = request.stream(`${baseUrl}.${page}`, {
        method: 'GET',
        headers: {
            Authorization: authToken
        }
    });

    return new Promise((resolve, reject) => {
        requestStream.on('error', err => {
            if (err.response && err.response.statusCode === 404) {
                resolve([]);
            } else {
                reject(err);
            }
        });
        requestStream
            // Parse the ndjson
            .pipe(ndjson.parse({ strict: false }))
            // Only save lines that we care about
            .on('data', line => {
                const isNextLine = sort === 'ascending' ? line.n >= linesFrom : line.n <= linesFrom;

                if (isNextLine) {
                    output.push(line);
                }
            })
            .on('end', () => resolve(output));
    });
}